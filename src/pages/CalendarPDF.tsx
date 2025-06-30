import { useEffect, useState } from 'react';
import { CalendarPDFView } from '@/components/CalendarPDFView';
import { itineraryData, ItineraryItem } from '@/data/itineraryData';

const CalendarPDF = () => {
  const [items, setItems] = useState<ItineraryItem[]>([]);

  useEffect(() => {
    setItems(itineraryData);
  }, []);

  return <CalendarPDFView items={items} />;
};

export default CalendarPDF;
