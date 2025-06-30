import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Calendar, Key, Bug } from 'lucide-react';
import { GoogleCalendarDebug } from './GoogleCalendarDebug';

interface GoogleCalendarSettingsProps {
  apiKey: string;
  calendarId: string;
  onSave: (apiKey: string, calendarId: string) => void;
  onTest: (apiKey: string, calendarId: string) => Promise<boolean>;
}

export function GoogleCalendarSettings({
  apiKey: initialApiKey,
  calendarId: initialCalendarId,
  onSave,
  onTest
}: GoogleCalendarSettingsProps) {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [calendarId, setCalendarId] = useState(initialCalendarId);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTest = async () => {
    if (!apiKey || !calendarId) {
      setTestResult({ success: false, message: 'Please enter both API Key and Calendar ID' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const success = await onTest(apiKey, calendarId);
      setTestResult({
        success,
        message: success ? 'Connection successful! Calendar events can be fetched.' : 'Failed to connect to Google Calendar. Please check your credentials.'
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `Error testing connection: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    onSave(apiKey, calendarId);
    setTestResult({ success: true, message: 'Settings saved successfully!' });
  };

  return (
    <Tabs defaultValue="settings" className="w-full max-w-2xl">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="debug">Debug</TabsTrigger>
      </TabsList>
      
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Google Calendar Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Google Calendar API key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calendarId" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Calendar ID
              </Label>
              <Input
                id="calendarId"
                value={calendarId}
                onChange={(e) => setCalendarId(e.target.value)}
                placeholder="Enter your calendar ID (e.g., primary or email)"
              />
              <p className="text-xs text-gray-500">
                Use "primary" for your main calendar, or enter an email address for a specific calendar
              </p>
            </div>

            {testResult && (
              <Alert className={testResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <AlertDescription className={testResult.success ? 'text-green-800' : 'text-red-800'}>
                  {testResult.message}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleTest}
                disabled={testing || !apiKey || !calendarId}
                variant="outline"
                className="flex-1"
              >
                {testing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </Button>
              <Button
                onClick={handleSave}
                disabled={!apiKey || !calendarId}
                className="flex-1"
              >
                Save Settings
              </Button>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>How to get your API Key:</strong></p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                <li>Create a new project or select existing one</li>
                <li>Enable Google Calendar API</li>
                <li>Create credentials (API Key)</li>
                <li>Restrict the API key to Google Calendar API only</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="debug">
        <GoogleCalendarDebug apiKey={apiKey} calendarId={calendarId} />
      </TabsContent>
    </Tabs>
  );
} 