import { useState, useMemo, useEffect } from 'react';
import { ItineraryCard } from "@/components/ItineraryCard";
import { CalendarView } from "@/components/CalendarView";
import { itineraryData, ItineraryItem } from "@/data/itineraryData";
import { useGoogleCalendar } from "@/hooks/useGoogleCalendar";
import { GoogleCalendarService } from "@/lib/googleCalendar";
import { Button } from "@/components/ui/button";
import { Calendar, List, RefreshCw, Database } from "lucide-react";
import { logActivitiesToFile } from "@/utils/activitiesLogger";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [view, setView] = useState<'timeline' | 'calendar'>(() => {
    // Set initial view based on screen size
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024 ? 'timeline' : 'calendar';
    }
    return 'calendar'; // fallback
  });
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [showLocalData, setShowLocalData] = useState(false);
  
  // Google Calendar settings - hardcoded to Boys Schedule
  const googleApiKey = 'AIzaSyCYaN-4ZaDF_HnJxhklQaSEtgC6o4qqiqs';
  const googleCalendarId = '6138a69dd5ffb10cb29d68d4be82a6c18487156ec0e10e2d51d752d6eb3fb2ad@group.calendar.google.com';
  
  // Date range for Google Calendar
  const startDate = new Date(2025, 6, 7); // July 7, 2025
  const endDate = new Date(2025, 7, 18); // August 18, 2025
  
  // Google Calendar data
  const { items: googleItems, loading: googleLoading, error: googleError, refetch: refetchGoogle } = useGoogleCalendar({
    apiKey: googleApiKey,
    calendarId: googleCalendarId,
    startDate,
    endDate,
    enabled: true
  });

  // Use Google Calendar data only
  const items = googleItems;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Responsive view switching based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      const newView = isMobile ? 'timeline' : 'calendar';
      
      // Only auto-switch if the view doesn't match the expected view for this screen size
      if (view !== newView) {
        setView(newView);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [view]);

  // Manual view toggle for mobile
  const handleViewToggle = (newView: 'timeline' | 'calendar') => {
    setView(newView);
  };

  const handleUpdateItem = (id: string, updates: Partial<ItineraryItem>) => {
    // Note: Google Calendar updates would require additional implementation
    console.log('Update requested for Google Calendar item:', id, updates);
  };

  const handleRefresh = async () => {
    setLastRefresh(new Date());
    await refetchGoogle();
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, items]);

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

  // Add grouping by exact date for timeline view
  const groupedByDate = useMemo(() => {
    const map = new Map<string, ItineraryItem[]>();
    filteredItems.forEach(item => {
      const dateKey = item.fullDate.toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
      });
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(item);
    });
    map.forEach(group => group.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime()));
    return Array.from(map.entries()).sort(
      ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
    );
  }, [filteredItems]);

  // Log all activities for emoji analysis
  useEffect(() => {
    if (items.length > 0) {
      // Log to local file
      logActivitiesToFile(items);
    }
  }, [items]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Top Navigation Bar */}
      <header className="flex flex-col sm:flex-row h-auto sm:h-16 shrink-0 items-start sm:items-center gap-2 sm:gap-4 border-b bg-white/80 backdrop-blur-sm px-3 sm:px-6 py-3 sm:py-0">
        <div className="flex-1 w-full sm:w-auto">
          <h1 className="text-base sm:text-lg font-semibold text-gray-800">
            Camp Sdei Chemed - Boys 2025
            {showLocalData && <span className="ml-2 text-xs sm:text-sm text-blue-600">(Local Data)</span>}
          </h1>
          <p className="text-xs text-gray-500">
            Last updated: {lastRefresh.toLocaleTimeString()}
            {showLocalData && <span className="ml-2 text-blue-600">• Showing API data directly</span>}
          </p>
        </div>
        
        {/* Control Buttons - Stack on mobile */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Data Source Toggle */}
          <Button
            size="sm"
            variant={showLocalData ? "default" : "outline"}
            onClick={() => setShowLocalData(!showLocalData)}
            className="flex items-center gap-1 sm:gap-2 text-xs"
          >
            <Database className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{showLocalData ? 'API View' : 'Local Data'}</span>
            <span className="sm:hidden">{showLocalData ? 'API' : 'Local'}</span>
          </Button>
          
          {/* Refresh Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={googleLoading}
            className="flex items-center gap-1 sm:gap-2 text-xs"
          >
            <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${googleLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
            <span className="sm:hidden">↻</span>
          </Button>
          
          {/* Mobile View Toggle */}
          <div className="flex lg:hidden items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              size="sm"
              variant={view === 'timeline' ? 'default' : 'ghost'}
              onClick={() => handleViewToggle('timeline')}
              className="flex items-center gap-1 text-xs"
            >
              <List className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Timeline</span>
              <span className="sm:hidden">📋</span>
            </Button>
            <Button
              size="sm"
              variant={view === 'calendar' ? 'default' : 'ghost'}
              onClick={() => handleViewToggle('calendar')}
              className="flex items-center gap-1 text-xs"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Calendar</span>
              <span className="sm:hidden">📅</span>
            </Button>
          </div>
          
          {/* Desktop View Toggle - Only show on larger screens since mobile auto-switches */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              size="sm"
              variant={view === 'calendar' ? 'default' : 'ghost'}
              onClick={() => setView('calendar')}
              className="flex items-center gap-1 text-xs"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Calendar</span>
              <span className="sm:hidden">📅</span>
            </Button>
            <Button
              size="sm"
              variant={view === 'timeline' ? 'default' : 'ghost'}
              onClick={() => setView('timeline')}
              className="flex items-center gap-1 text-xs"
            >
              <List className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Timeline</span>
              <span className="sm:hidden">📋</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        {/* Loading State */}
        {googleLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Refreshing calendar data...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {googleError && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-red-600 text-2xl mb-2">⚠️</div>
              <p className="text-sm text-gray-600">Error loading calendar: {googleError}</p>
              <Button size="sm" onClick={handleRefresh} className="mt-2">
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Data Info Panel */}
        {showLocalData && (
          <div className="bg-blue-50 border-b border-blue-200 p-3 sm:p-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">API Data Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs text-blue-700">
                <div>
                  <strong>Total Items:</strong> {items.length}
                </div>
                <div>
                  <strong>Calendar ID:</strong> {googleCalendarId.substring(0, 20)}...
                </div>
                <div>
                  <strong>Date Range:</strong> {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </div>
              </div>
              {items.length > 0 && (
                <div className="mt-2 text-xs text-blue-600">
                  <strong>First 3 items:</strong> {items.slice(0, 3).map(item => item.title).join(', ')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Responsive View Display */}
        {!googleLoading && !googleError && (
          <>
            {/* Mobile: Show Timeline by default, Calendar if manually selected */}
            <div className="block lg:hidden">
              {view === 'calendar' ? (
                <CalendarView items={filteredItems} onUpdateItem={handleUpdateItem} />
              ) : (
                <div className="px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 md:space-y-12">
                  {groupedByDate.map(([dateKey, dateItems]) => (
                    <div key={dateKey}>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6 text-center">
                        {dateKey}
                      </h2>
                      <div className="grid gap-2 sm:gap-3 md:gap-6">
                        {dateItems.map(item => {
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
                              hideDate={true}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {filteredItems.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <div className="text-3xl sm:text-4xl md:text-6xl mb-4">🔍</div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-2">
                        No activities found
                      </h3>
                      <p className="text-sm md:text-base text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop: Show Calendar or Timeline based on view state */}
            <div className="hidden lg:block">
              {view === 'calendar' ? (
                <CalendarView items={filteredItems} onUpdateItem={handleUpdateItem} />
              ) : (
                <div className="px-6 py-8 space-y-8 md:space-y-12">
                  {groupedByDate.map(([dateKey, dateItems]) => (
                    <div key={dateKey}>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
                        {dateKey}
                      </h2>
                      <div className="grid gap-3 md:gap-6">
                        {dateItems.map(item => {
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
                              hideDate={true}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}

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
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
