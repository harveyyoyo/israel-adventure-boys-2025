
import { useEffect, useState } from 'react';
import { CalendarPDFView } from '@/components/CalendarPDFView';
import { itineraryData, ItineraryItem } from '@/data/itineraryData';

const CalendarPDF = () => {
  const [items, setItems] = useState<ItineraryItem[]>([]);

  useEffect(() => {
    setItems(itineraryData);
    
    // Auto-trigger print dialog after a short delay to ensure content is loaded
    const timer = setTimeout(() => {
      window.print();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <CalendarPDFView items={items} />;
};

export default CalendarPDF;
