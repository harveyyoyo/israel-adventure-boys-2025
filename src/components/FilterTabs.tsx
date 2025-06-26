
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activityCounts: Record<string, number>;
}

export const FilterTabs = ({ activeFilter, onFilterChange, activityCounts }: FilterTabsProps) => {
  const filters = [
    { key: 'all', label: 'All Activities', icon: '📅' },
    { key: 'spiritual', label: 'Spiritual', icon: '🕊️' },
    { key: 'adventure', label: 'Adventure', icon: '🏔️' },
    { key: 'educational', label: 'Educational', icon: '📚' },
    { key: 'leisure', label: 'Leisure', icon: '🏖️' },
    { key: 'cultural', label: 'Cultural', icon: '🏛️' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          onClick={() => onFilterChange(filter.key)}
          className={`flex items-center gap-2 ${
            activeFilter === filter.key 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'hover:bg-gray-100'
          }`}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
          <Badge 
            variant="secondary" 
            className={`ml-1 ${
              activeFilter === filter.key 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100'
            }`}
          >
            {activityCounts[filter.key] || 0}
          </Badge>
        </Button>
      ))}
    </div>
  );
};
