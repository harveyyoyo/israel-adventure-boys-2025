export interface ItineraryItem {
  id: string;
  title: string;
  date: string;
  fullDate: Date;
  type: 'spiritual' | 'adventure' | 'educational' | 'leisure' | 'travel' | 'cultural';
  isMultiDay?: boolean;
  endDate?: Date;
}

export const itineraryData: ItineraryItem[] = [
  // Calendar is now connected to Google Calendar
  // Events will be loaded from: Camp Sdei Chemed 2025
  // Calendar ID: 630205b44a2f9a1157dd2f1e2d07c4c17596c451dee5e7d481bcedb895d2d1c1@group.calendar.google.com
];
