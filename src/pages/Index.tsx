
import { useState, useEffect } from "react";
import { ItineraryCard } from "@/components/ItineraryCard";
import { CalendarView } from "@/components/CalendarView";
import { ExportOptions } from "@/components/ExportOptions";
import { ItineraryItem } from "@/data/itineraryData";
import { Calendar, List, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function Index() {
  const [view, setView] = useState<'timeline' | 'calendar'>(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 1024;
      return isMobile ? 'timeline' : 'calendar';
    }
    return 'calendar';
  });

  const items = staticItems;
  const loading = false;
  const error = null;

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const newView = isMobile ? 'timeline' : 'calendar';
      setView(newView);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUpdateItem = async (id: string, updates: Partial<ItineraryItem>) => {
    console.log('Update requested for item:', id, updates);
  };

  const handleRefresh = async () => {
    console.log('Refresh requested - using static data');
  };

  const filteredItems = items;

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

        {/* Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Summer 2025 Itinerary
            </CardTitle>
            <CardDescription>
              Complete schedule for Camp Sdei Chemed Boys 2025 program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Program Dates:</strong> July 7 - July 18, 2025
              </div>
              <div>
                <strong>Activities:</strong> {filteredItems.length} scheduled events
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="space-y-6">
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

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600">Check back later for updates to the itinerary.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
