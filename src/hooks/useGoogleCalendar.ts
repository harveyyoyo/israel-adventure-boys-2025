import { useState, useEffect, useCallback, useRef } from 'react';
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

export const useGoogleCalendar = (options: UseGoogleCalendarOptions): UseGoogleCalendarReturn => {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  
  const { apiKey, calendarId, startDate, endDate, enabled = true } = options;
  
  const serviceRef = useRef<GoogleCalendarService | null>(null);
  const hasInitializedRef = useRef(false);
  
  // Create service instance
  useEffect(() => {
    if (apiKey && calendarId) {
      try {
        serviceRef.current = new GoogleCalendarService(apiKey, calendarId);
        console.log('GoogleCalendarService initialized with:', {
          apiKey: apiKey.substring(0, 10) + '...',
          calendarId: calendarId
        });
      } catch (err) {
        console.error('Failed to initialize GoogleCalendarService:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize calendar service');
      }
    }
  }, [apiKey, calendarId]);

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!enabled || !serviceRef.current) {
      console.log('Calendar fetch disabled or service not initialized');
      return;
    }

    // Add cache busting - force refresh if requested or if data is older than 5 minutes
    const now = Date.now();
    const shouldRefresh = forceRefresh || (now - lastFetch > 5 * 60 * 1000);
    
    if (!shouldRefresh && items.length > 0) {
      console.log('Using cached data, last fetch was', Math.round((now - lastFetch) / 1000), 'seconds ago');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching calendar data...', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        forceRefresh
      });
      
      const fetchedItems = await serviceRef.current.getItineraryItems(startDate, endDate);
      
      console.log('Calendar data fetched successfully:', {
        itemCount: fetchedItems.length,
        firstItem: fetchedItems[0]?.title,
        lastItem: fetchedItems[fetchedItems.length - 1]?.title
      });
      
      setItems(fetchedItems);
      setLastFetch(now);
    } catch (err) {
      console.error('Error fetching calendar data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch calendar data');
    } finally {
      setLoading(false);
    }
  }, [enabled, startDate, endDate, lastFetch]);

  // Initial fetch - only run once
  useEffect(() => {
    if (!hasInitializedRef.current && enabled && apiKey && calendarId) {
      hasInitializedRef.current = true;
      fetchData(true);
    }
  }, [enabled, apiKey, calendarId, fetchData]);

  // Refetch function
  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  return {
    items,
    loading,
    error,
    refetch
  };
}; 