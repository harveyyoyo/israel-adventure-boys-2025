import { ItineraryItem } from '@/data/itineraryData';

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  description?: string;
  colorId?: string;
}

interface GoogleCalendarResponse {
  items: GoogleCalendarEvent[];
}

// Map Google Calendar colors to activity types
const colorToTypeMap: { [key: string]: ItineraryItem['type'] } = {
  '1': 'spiritual',    // Lavender
  '2': 'adventure',    // Sage
  '3': 'educational',  // Grape
  '4': 'leisure',      // Flamingo
  '5': 'travel',       // Banana
  '6': 'cultural',     // Tangerine
  '7': 'spiritual',    // Peacock
  '8': 'adventure',    // Graphite
  '9': 'educational',  // Blueberry
  '10': 'leisure',     // Basil
  '11': 'travel',      // Tomato
};

// Default type if no color is specified
const DEFAULT_TYPE: ItineraryItem['type'] = 'leisure';

// Default API key for testing (you should replace this with your own)
const DEFAULT_API_KEY = 'AIzaSyCYaN-4ZaDF_HnJxhklQaSEtgC6o4qqiqs';

export class GoogleCalendarService {
  private apiKey: string;
  private calendarId: string;

  constructor(apiKey: string, calendarId: string) {
    this.apiKey = apiKey || DEFAULT_API_KEY;
    this.calendarId = calendarId;
    
    // Validate inputs
    if (!this.apiKey || this.apiKey.trim() === '') {
      throw new Error('Google Calendar API key is required');
    }
    if (!this.calendarId || this.calendarId.trim() === '') {
      throw new Error('Google Calendar ID is required');
    }
    
    console.log('GoogleCalendarService initialized with:', {
      apiKey: this.apiKey.substring(0, 10) + '...',
      calendarId: this.calendarId
    });
  }

  private async fetchEvents(startDate: Date, endDate: Date): Promise<GoogleCalendarEvent[]> {
    // Use ISO date strings for the API request, but specify the calendar's timezone
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    // Use the calendar's timezone (America/New_York) to avoid date shifting
    // Remove timezone parameter from URL to avoid 400 errors, but handle timezone in conversion
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.calendarId)}/events?key=${this.apiKey}&timeMin=${startDateStr}T00:00:00Z&timeMax=${endDateStr}T23:59:59Z&singleEvents=true&orderBy=startTime`;
    
    console.log('Fetching Google Calendar events from:', url);
    console.log('Date range:', { startDate: startDateStr, endDate: endDateStr });
    
    try {
      const response = await fetch(url);
      console.log('Google Calendar API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Google Calendar API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data: GoogleCalendarResponse = await response.json();
      console.log('Google Calendar events fetched:', data.items?.length || 0, 'events');
      
      // Log each event for debugging
      if (data.items && data.items.length > 0) {
        console.log('Events found:');
        data.items.forEach((event, index) => {
          console.log(`${index + 1}. ${event.summary} - ${event.start.dateTime || event.start.date}`);
        });
      } else {
        console.log('No events found in the specified date range');
      }
      
      return data.items || [];
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      throw error;
    }
  }

  private convertEventToItineraryItem(event: GoogleCalendarEvent): ItineraryItem {
    // Handle timezone conversion properly
    let startDate: Date;
    let endDate: Date;
    
    console.log(`Processing event: ${event.summary}`);
    console.log(`Original start: ${event.start.dateTime || event.start.date}`);
    console.log(`Original end: ${event.end.dateTime || event.end.date}`);
    
    if (event.start.dateTime) {
      // For events with specific time, Google Calendar returns UTC time
      // We need to convert it to the user's local timezone
      startDate = new Date(event.start.dateTime);
      // The Date constructor automatically converts UTC to local time
    } else {
      // For all-day events, Google Calendar returns dates in the calendar's timezone
      // We need to create a date in the user's local timezone
      const [year, month, day] = event.start.date!.split('-').map(Number);
      startDate = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    }
    
    if (event.end.dateTime) {
      // For events with specific time, Google Calendar returns UTC time
      endDate = new Date(event.end.dateTime);
      // The Date constructor automatically converts UTC to local time
    } else {
      // For all-day events, Google Calendar returns dates in the calendar's timezone
      const [year, month, day] = event.end.date!.split('-').map(Number);
      endDate = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    }
    
    // Check if it's a multi-day event
    const isMultiDay = this.isMultiDayEvent(startDate, endDate);
    
    // Determine activity type from color or default
    const activityType = event.colorId ? colorToTypeMap[event.colorId] || DEFAULT_TYPE : DEFAULT_TYPE;
    
    console.log(`Converting event: ${event.summary} (color: ${event.colorId}, type: ${activityType})`);
    console.log(`Converted start: ${startDate.toISOString()}, End: ${endDate.toISOString()}`);
    console.log(`Local start date: ${startDate.toLocaleDateString()}, Local end date: ${endDate.toLocaleDateString()}`);
    console.log(`Is multi-day: ${isMultiDay}`);
    
    // Create a normalized date for comparison (just the date part, no time)
    const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    
    return {
      id: event.id,
      title: event.summary,
      date: this.formatDate(startDate),
      fullDate: normalizedStartDate, // Use normalized date to avoid timezone issues
      type: activityType,
      isMultiDay: isMultiDay,
      endDate: isMultiDay ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : undefined
    };
  }

  private isMultiDayEvent(startDate: Date, endDate: Date): boolean {
    const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const diffTime = endDay.getTime() - startDay.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1;
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  async getItineraryItems(startDate: Date, endDate: Date): Promise<ItineraryItem[]> {
    try {
      console.log('Getting itinerary items from Google Calendar:', { startDate, endDate, calendarId: this.calendarId });
      const events = await this.fetchEvents(startDate, endDate);
      const items = events.map(event => this.convertEventToItineraryItem(event));
      console.log('Converted itinerary items:', items.length);
      return items;
    } catch (error) {
      console.error('Error getting itinerary items from Google Calendar:', error);
      throw error;
    }
  }
}

// Helper function to create a Google Calendar service instance
export function createGoogleCalendarService(apiKey: string, calendarId: string): GoogleCalendarService {
  return new GoogleCalendarService(apiKey, calendarId);
} 