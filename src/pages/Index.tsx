
import { useState, useMemo } from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { ItineraryHeader } from "@/components/ItineraryHeader";
import { ItineraryCard } from "@/components/ItineraryCard";
import { CalendarView } from "@/components/CalendarView";
import { AppSidebar } from "@/components/AppSidebar";
import { itineraryData, ItineraryItem } from "@/data/itineraryData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [view, setView] = useState<'timeline' | 'calendar'>('calendar');
  const [items, setItems] = useState<ItineraryItem[]>(itineraryData);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleUpdateItem = (id: string, updates: Partial<ItineraryItem>) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, ...updates }
          : item
      )
    );
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
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold text-gray-800 md:hidden">
                Israel Adventure Boys 2025
              </h1>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="hidden md:block">
                <ItineraryHeader />
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
