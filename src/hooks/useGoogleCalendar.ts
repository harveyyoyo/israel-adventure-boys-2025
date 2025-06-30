import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ItineraryItem } from '@/data/itineraryData';
import { GoogleCalendarService } from '@/lib/googleCalendar';

interface UseGoogleCalendarOptions {
  apiKey: string;
  calendarId: string;
  startDate: Date;
  endDate: Date;
  enabled?: boolean;
}

interface UseGoogleCalendarReturn {
  items: ItineraryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGoogleCalendar({
  apiKey,
  calendarId,
  startDate,
  endDate,
  enabled = true
}: UseGoogleCalendarOptions): UseGoogleCalendarReturn {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastFetchRef = useRef<string>('');

  // Memoize date strings to prevent unnecessary re-renders
  const startDateStr = useMemo(() => startDate.toISOString(), [startDate]);
  const endDateStr = useMemo(() => endDate.toISOString(), [endDate]);

  const fetchItems = useCallback(async () => {
    const fetchKey = `${apiKey}-${calendarId}-${startDateStr}-${endDateStr}-${enabled}`;
    
    console.log('useGoogleCalendar: fetchItems called', { enabled, apiKey: !!apiKey, calendarId, startDateStr, endDateStr });
    
    if (!enabled || !apiKey || !calendarId) {
      console.log('useGoogleCalendar: Skipping fetch - not enabled or missing credentials');
      return;
    }

    // Prevent duplicate fetches
    if (lastFetchRef.current === fetchKey) {
      console.log('useGoogleCalendar: Skipping duplicate fetch');
      return;
    }

    console.log('useGoogleCalendar: Starting fetch...');
    setLoading(true);
    setError(null);
    lastFetchRef.current = fetchKey;

    try {
      const service = new GoogleCalendarService(apiKey, calendarId);
      console.log('useGoogleCalendar: Service created, fetching items...');
      const fetchedItems = await service.getItineraryItems(startDate, endDate);
      console.log('useGoogleCalendar: Items fetched successfully', fetchedItems.length, 'items');
      setItems(fetchedItems);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch calendar events';
      console.error('useGoogleCalendar: Error occurred', err);
      setError(errorMessage);
    } finally {
      console.log('useGoogleCalendar: Fetch completed, setting loading to false');
      setLoading(false);
    }
  }, [apiKey, calendarId, startDateStr, endDateStr, enabled]);

  useEffect(() => {
    console.log('useGoogleCalendar: useEffect triggered', { enabled, apiKey: !!apiKey, calendarId });
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    refetch: fetchItems
  };
} 