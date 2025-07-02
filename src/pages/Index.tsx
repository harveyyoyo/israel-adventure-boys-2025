import { useState, useMemo, useEffect } from 'react';
import { ItineraryCard } from "@/components/ItineraryCard";
import { CalendarView } from "@/components/CalendarView";
import { itineraryData, ItineraryItem } from "@/data/itineraryData";
import { useGoogleCalendar } from "@/hooks/useGoogleCalendar";
import { GoogleCalendarService } from "@/lib/googleCalendar";
import { Button } from "@/components/ui/button";
import { Calendar, List } from "lucide-react";
import { logActivitiesToFile } from "@/utils/activitiesLogger";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [view, setView] = useState<'timeline' | 'calendar'>('calendar');
  
  // Google Calendar settings
  const [googleApiKey, setGoogleApiKey] = useState(localStorage.getItem('googleApiKey') || 'AIzaSyCYaN-4ZaDF_HnJxhklQaSEtgC6o4qqiqs');
  const [googleCalendarId, setGoogleCalendarId] = useState(localStorage.getItem('googleCalendarId') || '6138a69dd5ffb10cb29d68d4be82a6c18487156ec0e10e2d51d752d6eb3fb2ad@group.calendar.google.com');
  
  // Date range for Google Calendar
  const startDate = new Date(2025, 6, 7); // July 7, 2025
  const endDate = new Date(2025, 7, 18); // August 18, 2025
  
  // Google Calendar data
  const { items: googleItems, loading: googleLoading, error: googleError, refetch: refetchGoogle } = useGoogleCalendar({
    apiKey: googleApiKey,
    calendarId: googleCalendarId,
    startDate,
    endDate,
    enabled: !!googleApiKey && !!googleCalendarId
  });

  // Use Google Calendar data only
  const items = googleItems;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleUpdateItem = (id: string, updates: Partial<ItineraryItem>) => {
    // Note: Google Calendar updates would require additional implementation
    console.log('Update requested for Google Calendar item:', id, updates);
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
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-6">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">
            Camp Sdei Chemed - Boys 2025
          </h1>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <Button
            size="sm"
            variant={view === 'calendar' ? 'default' : 'ghost'}
            onClick={() => setView('calendar')}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Calendar
          </Button>
          <Button
            size="sm"
            variant={view === 'timeline' ? 'default' : 'ghost'}
            onClick={() => setView('timeline')}
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            Timeline
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        {/* Calendar or Timeline View */}
        {view === 'calendar' ? (
          <CalendarView items={filteredItems} onUpdateItem={handleUpdateItem} />
        ) : (
          <div className="px-6 py-8 space-y-8 md:space-y-12">
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
      </main>
    </div>
  );
};

export default Index;
