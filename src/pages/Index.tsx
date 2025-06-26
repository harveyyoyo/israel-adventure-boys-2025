
import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ItineraryHeader } from "@/components/ItineraryHeader";
import { ItineraryCard } from "@/components/ItineraryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { itineraryData } from "@/data/itineraryData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredItems = useMemo(() => {
    return itineraryData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const activityCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: itineraryData.length,
      spiritual: 0,
      adventure: 0,
      educational: 0,
      leisure: 0,
      travel: 0,
      cultural: 0
    };

    itineraryData.forEach(item => {
      counts[item.type]++;
    });

    return counts;
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <ItineraryHeader />
        
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 focus:border-blue-400 rounded-xl"
            />
          </div>

          {/* Filter Tabs */}
          <FilterTabs 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activityCounts={activityCounts}
          />

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing {filteredItems.length} of {itineraryData.length} activities
            </p>
          </div>

          {/* Itinerary Timeline */}
          <div className="space-y-12">
            {Object.entries(groupedItems).map(([monthYear, items]) => (
              <div key={monthYear}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {monthYear}
                </h2>
                <div className="grid gap-4 md:gap-6">
                  {items.map(item => {
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
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No activities found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
