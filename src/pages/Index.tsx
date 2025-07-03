import { useState, useEffect } from "react";
import { ItineraryCard } from "@/components/ItineraryCard";
import { CalendarView } from "@/components/CalendarView";
import { ExportOptions } from "@/components/ExportOptions";
import { ItineraryItem } from "@/data/itineraryData";
import { Calendar, List, RefreshCw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Static sample data for testing without Google Calendar
const staticItems: ItineraryItem[] = [
  {
    id: "1",
    title: "Arrival & Welcome",
    date: "Monday, July 7, 2025",
    fullDate: new Date(2025, 6, 7),
    type: "spiritual",
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
  }
];

export default function Index() {
  const [view, setView] = useState<'timeline' | 'calendar'>(() => {
    // Check if we're on mobile
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 1024;
      return isMobile ? 'timeline' : 'calendar';
    }
    return 'calendar'; // fallback
  });

  // Use static data instead of Google Calendar
  const items = staticItems;
  const loading = false;
  const error = null;

  // Handle window resize for responsive view switching
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const newView = isMobile ? 'timeline' : 'calendar';
      setView(newView);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle item updates (for static data, just log the request)
  const handleUpdateItem = async (id: string, updates: Partial<ItineraryItem>) => {
    console.log('Update requested for static item:', id, updates);
    // In a real app, you would update the data here
  };

  // Handle refresh (for static data, just log the request)
  const handleRefresh = async () => {
    console.log('Refresh requested for static data');
    // In a real app, you would refetch data here
  };

  // Filter items (no filtering for static data)
  const filteredItems = items;

  // Group items by date for timeline view
  const groupedByDate = filteredItems.reduce((groups, item) => {
    const dateKey = item.fullDate.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(item);
    return groups;
  }, {} as Record<string, ItineraryItem[]>);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Camp Sdei Chemed 2025
              </h1>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                "Off the Beaten Path" Summer Program
              </p>
            </div>
            
            {/* Export Options */}
            <div className="mt-4 sm:mt-0">
              <ExportOptions items={filteredItems} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={view === 'timeline' ? 'default' : 'ghost'}
                onClick={() => setView('timeline')}
                className="flex items-center gap-2"
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Timeline</span>
              </Button>
              
              <Button
                variant={view === 'calendar' ? 'default' : 'ghost'}
                onClick={() => setView('calendar')}
                className="flex items-center gap-2"
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Calendar</span>
              </Button>
            </div>

            {/* Mobile View Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <Button
                variant={view === 'timeline' ? 'default' : 'ghost'}
                onClick={() => setView('timeline')}
                size="sm"
                className="flex items-center gap-1"
              >
                <List className="w-3 h-3" />
                <span>Timeline</span>
              </Button>
              
              <Button
                variant={view === 'calendar' ? 'default' : 'ghost'}
                onClick={() => setView('calendar')}
                size="sm"
                className="flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Calendar</span>
              </Button>
            </div>

            {/* Refresh Button */}
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Status Messages */}
        {loading && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <p className="text-sm text-gray-600">Refreshing calendar data...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-red-500" />
                <p className="text-sm text-gray-600">Error loading calendar: {error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Static Data Mode
            </CardTitle>
            <CardDescription>
              Currently using static sample data for testing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Data Source:</strong> Static sample data
              </div>
              <div>
                <strong>Items:</strong> {filteredItems.length} activities
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {!loading && !error && (
          <div className="space-y-6">
            {/* Mobile: Show Timeline by default, Calendar if manually selected */}
            <div className="block lg:hidden">
              {view === 'calendar' ? (
                <CalendarView items={filteredItems} onUpdateItem={handleUpdateItem} />
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedByDate).map(([dateKey, dateItems]) => (
                    <div key={dateKey}>
                      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        {dateKey}
                      </h2>
                      <div className="grid gap-3">
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
                </div>
              )}
            </div>

            {/* Desktop: Show Calendar or Timeline based on view state */}
            <div className="hidden lg:block">
              {view === 'calendar' ? (
                <CalendarView items={filteredItems} onUpdateItem={handleUpdateItem} />
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedByDate).map(([dateKey, dateItems]) => (
                    <div key={dateKey}>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        {dateKey}
                      </h2>
                      <div className="grid gap-6">
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
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600">Try adjusting your date range or check back later.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
