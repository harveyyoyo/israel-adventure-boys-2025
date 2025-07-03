import { useEffect, useState } from 'react';
import { CalendarPDFView } from '@/components/CalendarPDFView';
import { ItineraryItem } from '@/data/itineraryData';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';

const CalendarPDF = () => {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  
  // Google Calendar settings
  const googleApiKey = localStorage.getItem('googleApiKey') || 'AIzaSyCYaN-4ZaDF_HnJxhklQaSEtgC6o4qqiqs';
  const googleCalendarId = localStorage.getItem('googleCalendarId') || '6138a69dd5ffb10cb29d68d4be82a6c18487156ec0e10e2d51d752d6eb3fb2ad@group.calendar.google.com';
  
  // Date range for Google Calendar
  const startDate = new Date(2025, 6, 7); // July 7, 2025
  const endDate = new Date(2025, 7, 18); // August 18, 2025
  
  // Google Calendar data
  const { items: googleItems, loading: googleLoading, error: googleError } = useGoogleCalendar({
    apiKey: googleApiKey,
    calendarId: googleCalendarId,
    startDate,
    endDate,
    enabled: !!googleApiKey && !!googleCalendarId
  });

  useEffect(() => {
    // Use Google Calendar data if available, otherwise use empty array
    setItems(googleItems);
  }, [googleItems]);

  if (googleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar data...</p>
        </div>
      </div>
    );
  }

  if (googleError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <p className="text-gray-600">Error loading calendar: {googleError}</p>
        </div>
      </div>
    );
  }

  return <CalendarPDFView items={items} />;
};

export default CalendarPDF;
