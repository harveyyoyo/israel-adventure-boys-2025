
import { CalendarPDFView } from '@/components/CalendarPDFView';
import { ItineraryItem } from '@/data/itineraryData';

// Static itinerary data
const staticItems: ItineraryItem[] = [
  {
    id: "1",
    title: "Arrival & Welcome",
    date: "Monday, July 7, 2025",
    fullDate: new Date(2025, 6, 7),
    type: "travel",
    isMultiDay: false
  },
  {
    id: "2", 
    title: "Jerusalem Old City Tour",
    date: "Tuesday, July 8, 2025",
    fullDate: new Date(2025, 6, 8),
    type: "cultural",
    isMultiDay: false
  },
  {
    id: "3",
    title: "Masada & Dead Sea",
    date: "Wednesday, July 9, 2025", 
    fullDate: new Date(2025, 6, 9),
    type: "adventure",
    isMultiDay: false
  },
  {
    id: "4",
    title: "Tzfat & Northern Israel",
    date: "Thursday, July 10, 2025",
    fullDate: new Date(2025, 6, 10),
    type: "spiritual",
    isMultiDay: false
  },
  {
    id: "5",
    title: "Tel Aviv & Beach Day",
    date: "Friday, July 11, 2025",
    fullDate: new Date(2025, 6, 11),
    type: "leisure",
    isMultiDay: false
  },
  {
    id: "6",
    title: "Shabbos in Jerusalem",
    date: "Saturday, July 12, 2025",
    fullDate: new Date(2025, 6, 12),
    type: "spiritual",
    isMultiDay: false
  },
  {
    id: "7",
    title: "Golan Heights Adventure",
    date: "Sunday, July 13, 2025",
    fullDate: new Date(2025, 6, 13),
    type: "adventure",
    isMultiDay: false
  },
  {
    id: "8",
    title: "Eilat Beach Resort",
    date: "Monday, July 14, 2025",
    fullDate: new Date(2025, 6, 14),
    type: "leisure",
    isMultiDay: true,
    endDate: new Date(2025, 6, 16)
  },
  {
    id: "9",
    title: "Red Sea Snorkeling",
    date: "Tuesday, July 15, 2025",
    fullDate: new Date(2025, 6, 15),
    type: "adventure",
    isMultiDay: false
  },
  {
    id: "10",
    title: "Desert Camping Experience",
    date: "Wednesday, July 16, 2025",
    fullDate: new Date(2025, 6, 16),
    type: "adventure",
    isMultiDay: true,
    endDate: new Date(2025, 6, 17)
  },
  {
    id: "11",
    title: "Farewell Breakfast & Departure",
    date: "Friday, July 18, 2025",
    fullDate: new Date(2025, 6, 18),
    type: "travel",
    isMultiDay: false
  }
];

const CalendarPDF = () => {
  return <CalendarPDFView items={staticItems} />;
};

export default CalendarPDF;
