import { useState, useMemo, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { ItineraryHeader } from "@/components/ItineraryHeader";
import { ItineraryCard } from "@/components/ItineraryCard";
import { CalendarView } from "@/components/CalendarView";
import { AppSidebar } from "@/components/AppSidebar";
import { GoogleCalendarSettings } from "@/components/GoogleCalendarSettings";
import { itineraryData, ItineraryItem } from "@/data/itineraryData";
import { useGoogleCalendar } from "@/hooks/useGoogleCalendar";
import { GoogleCalendarService } from "@/lib/googleCalendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings, Calendar, Database } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [view, setView] = useState<'timeline' | 'calendar'>('calendar');
  const [dataSource, setDataSource] = useState<'local' | 'google'>('local');
  const [showSettings, setShowSettings] = useState(false);
  
  // Google Calendar settings
  const [googleApiKey, setGoogleApiKey] = useState(localStorage.getItem('googleApiKey') || 'AIzaSyCYaN-4ZaDF_HnJxhklQaSEtgC6o4qqiqs');
  const [googleCalendarId, setGoogleCalendarId] = useState(localStorage.getItem('googleCalendarId') || '6138a69dd5ffb10cb29d68d4be82a6c18487156ec0e10e2d51d752d6eb3fb2ad@group.calendar.google.com');
  
  // Local data
  const [localItems, setLocalItems] = useState<ItineraryItem[]>(itineraryData);
  
  // Date range for Google Calendar
  const startDate = new Date(2025, 6, 7); // July 7, 2025
  const endDate = new Date(2025, 7, 18); // August 18, 2025
  
  // Google Calendar data
  const { items: googleItems, loading: googleLoading, error: googleError, refetch: refetchGoogle } = useGoogleCalendar({
    apiKey: googleApiKey,
    calendarId: googleCalendarId,
    startDate,
    endDate,
    enabled: dataSource === 'google' && !!googleApiKey && !!googleCalendarId
  });

  // Use appropriate data source
  const items = dataSource === 'google' ? googleItems : localItems;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleUpdateItem = (id: string, updates: Partial<ItineraryItem>) => {
    if (dataSource === 'local') {
      setLocalItems(prevItems => 
        prevItems.map(item => 
          item.id === id 
            ? { ...item, ...updates }
            : item
        )
      );
    }
    // Note: Google Calendar updates would require additional implementation
  };

  const handleSaveGoogleSettings = (apiKey: string, calendarId: string) => {
    setGoogleApiKey(apiKey);
    setGoogleCalendarId(calendarId);
    localStorage.setItem('googleApiKey', apiKey);
    localStorage.setItem('googleCalendarId', calendarId);
    setShowSettings(false);
  };

  const handleTestGoogleConnection = async (apiKey: string, calendarId: string): Promise<boolean> => {
    try {
      const service = new GoogleCalendarService(apiKey, calendarId);
      const testItems = await service.getItineraryItems(startDate, endDate);
      return testItems.length >= 0; // If we get here, the connection worked
    } catch (error) {
      console.error('Google Calendar test failed:', error);
      return false;
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, items]);

  const activityCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: items.length,
      spiritual: 0,
      adventure: 0,
      educational: 0,
      leisure: 0,
      travel: 0,
      cultural: 0
    };

    items.forEach(item => {
      counts[item.type]++;
    });

    return counts;
  }, [items]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof filteredItems> = {};
    
    filteredItems.forEach(item => {
      const monthYear = item.fullDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(item);
    });

    // Sort each group by date
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());
    });

    return groups;
  }, [filteredItems]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <AppSidebar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activityCounts={activityCounts}
          view={view}
          onViewChange={setView}
          itemsCount={filteredItems.length}
          totalCount={items.length}
        />

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="ml-0" />
            <div className="flex-1 text-center md:hidden">
              <h1 className="text-base font-semibold text-gray-800">
                Camp Sdei Chemed - Boys 2025
              </h1>
            </div>
            
            {/* Data Source Toggle and Settings */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white rounded-lg border p-1">
                <Button
                  size="sm"
                  variant={dataSource === 'local' ? 'default' : 'ghost'}
                  onClick={() => setDataSource('local')}
                  className="flex items-center gap-1"
                >
                  <Database className="w-3 h-3" />
                  Local
                </Button>
                <Button
                  size="sm"
                  variant={dataSource === 'google' ? 'default' : 'ghost'}
                  onClick={() => setDataSource('google')}
                  className="flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  Google
                </Button>
              </div>
              
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Google Calendar Settings</DialogTitle>
                  </DialogHeader>
                  <GoogleCalendarSettings
                    apiKey={googleApiKey}
                    calendarId={googleCalendarId}
                    onSave={handleSaveGoogleSettings}
                    onTest={handleTestGoogleConnection}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="hidden md:block">
                <ItineraryHeader />
              </div>
              
              {/* Data Source Status */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Data Source: {dataSource === 'google' ? 'Google Calendar' : 'Local Data'}
                  </span>
                  {dataSource === 'google' && googleLoading && (
                    <span className="text-sm text-blue-600">Loading...</span>
                  )}
                  {dataSource === 'google' && googleError && (
                    <span className="text-sm text-red-600">Error: {googleError}</span>
                  )}
                  {dataSource === 'google' && !googleLoading && !googleError && (
                    <span className="text-sm text-green-600">
                      Connected ({googleItems.length} events, July 7 - Aug 18)
                    </span>
                  )}
                </div>
                {dataSource === 'google' && (
                  <Button size="sm" variant="outline" onClick={refetchGoogle}>
                    Refresh
                  </Button>
                )}
              </div>
              
              <div className="max-w-7xl mx-auto">
                {/* Calendar or Timeline View */}
                {view === 'calendar' ? (
                  <CalendarView items={filteredItems} onUpdateItem={handleUpdateItem} />
                ) : (
                  <div className="space-y-8 md:space-y-12">
                    {Object.entries(groupedItems).map(([monthYear, monthItems]) => (
                      <div key={monthYear}>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
                          {monthYear}
                        </h2>
                        <div className="grid gap-3 md:gap-6">
                          {monthItems.map(item => {
                            const itemDate = new Date(item.fullDate);
                            itemDate.setHours(0, 0, 0, 0);
                            
                            const isPast = itemDate < today;
                            const isToday = itemDate.getTime() === today.getTime();

                            return (
                              <ItineraryCard
                                key={item.id}
                                item={item}
                                isPast={isPast}
                                isToday={isToday}
                                onUpdateItem={handleUpdateItem}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl md:text-6xl mb-4">🔍</div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">
                      No activities found
                    </h3>
                    <p className="text-sm md:text-base text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
