import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GoogleCalendarService } from '@/lib/googleCalendar';
import { itineraryData } from '@/data/itineraryData';
import { Loader2, Bug, Calendar, CheckCircle, XCircle, Info } from 'lucide-react';

interface GoogleCalendarDebugProps {
  apiKey: string;
  calendarId: string;
}

export function GoogleCalendarDebug({ apiKey, calendarId }: GoogleCalendarDebugProps) {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    eventsCount?: number;
    error?: string;
    events?: any[];
    localEvents?: any[];
  } | null>(null);

  const testConnection = async () => {
    setTesting(true);
    setResult(null);

    try {
      const startDate = new Date(2025, 6, 7); // July 7, 2025
      const endDate = new Date(2025, 7, 18); // August 18, 2025

      console.log('Debug: Testing Google Calendar connection...');
      const service = new GoogleCalendarService(apiKey, calendarId);
      
      console.log('Debug: Fetching events...');
      const events = await service.getItineraryItems(startDate, endDate);
      
      console.log('Debug: Events fetched:', events);
      
      // Get local events for comparison
      const localEvents = itineraryData.filter(item => {
        const itemDate = item.fullDate;
        return itemDate >= startDate && itemDate <= endDate;
      });

      // Find events specifically on July 7 and 8
      const july7Events = events.filter(e => e.fullDate.getDate() === 7 && e.fullDate.getMonth() === 6);
      const july8Events = events.filter(e => e.fullDate.getDate() === 8 && e.fullDate.getMonth() === 6);
      const localJuly7Events = localEvents.filter(e => e.fullDate.getDate() === 7 && e.fullDate.getMonth() === 6);
      const localJuly8Events = localEvents.filter(e => e.fullDate.getDate() === 8 && e.fullDate.getMonth() === 6);

      console.log('July 7 events:', { google: july7Events.length, local: localJuly7Events.length });
      console.log('July 8 events:', { google: july8Events.length, local: localJuly8Events.length });
      
      setResult({
        success: true,
        message: `Successfully connected to Google Calendar! Found ${events.length} events.`,
        eventsCount: events.length,
        events: events,
        localEvents: localEvents
      });
    } catch (error) {
      console.error('Debug: Error testing connection:', error);
      setResult({
        success: false,
        message: 'Failed to connect to Google Calendar',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Google Calendar Debug
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>API Key:</strong> {apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Calendar ID:</strong> {calendarId}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Date Range:</strong> July 7 - August 18, 2025
          </p>
        </div>

        <Button
          onClick={testConnection}
          disabled={testing || !apiKey || !calendarId}
          className="w-full"
        >
          {testing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing Connection...
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 mr-2" />
              Test Connection
            </>
          )}
        </Button>

        {result && (
          <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
              <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
                {result.message}
                {result.eventsCount !== undefined && (
                  <div className="mt-1 text-sm">
                    Events found: {result.eventsCount}
                  </div>
                )}
                {result.error && (
                  <div className="mt-1 text-sm font-mono text-xs">
                    Error: {result.error}
                  </div>
                )}
              </AlertDescription>
            </div>
          </Alert>
        )}

        {result?.success && result.events && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Event Comparison</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Google Calendar Events ({result.events.length})</h4>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {result.events.length > 0 ? (
                    result.events.map((event, index) => (
                      <div key={index} className="text-xs p-2 bg-blue-50 rounded">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-gray-600">{event.date}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 italic">No events found</div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 mb-2">Local Data Events ({result.localEvents?.length || 0})</h4>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {result.localEvents && result.localEvents.length > 0 ? (
                    result.localEvents.map((event, index) => (
                      <div key={index} className="text-xs p-2 bg-green-50 rounded">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-gray-600">{event.date}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 italic">No events found</div>
                  )}
                </div>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Info className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-blue-800 text-sm">
                <strong>July 7-8 Check:</strong> If you see events in "Local Data" but not in "Google Calendar", 
                it means those events don't exist in your Google Calendar yet. You'll need to add them to your 
                Google Calendar for them to appear when using Google Calendar as the data source.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p><strong>Common Issues:</strong></p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>API key not restricted to Google Calendar API</li>
            <li>Calendar ID is incorrect</li>
            <li>No events in the specified date range</li>
            <li>Calendar is private or not shared</li>
            <li>Events exist in local data but not in Google Calendar</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 