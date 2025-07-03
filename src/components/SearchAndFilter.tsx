import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Calendar, MapPin, Clock, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  availableTypes: string[];
  totalItems: number;
  filteredCount: number;
}

export const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  availableTypes,
  totalItems,
  filteredCount
}: SearchAndFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const clearSearch = () => {
    onSearchChange('');
  };

  const clearFilters = () => {
    onFilterChange('all');
  };

  const hasActiveFilters = activeFilter !== 'all' || searchTerm.length > 0;

  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search activities, locations, or descriptions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Button */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={activeFilter !== 'all' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
                {activeFilter !== 'all' && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilter}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filter by Type</h4>
                  {activeFilter !== 'all' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-all"
                      checked={activeFilter === 'all'}
                      onCheckedChange={() => onFilterChange('all')}
                    />
                    <Label htmlFor="filter-all" className="text-sm font-normal">
                      All Activities ({totalItems})
                    </Label>
                  </div>
                  
                  {availableTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`filter-${type}`}
                        checked={activeFilter === type}
                        onCheckedChange={() => onFilterChange(type)}
                      />
                      <Label htmlFor={`filter-${type}`} className="text-sm font-normal">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {availableTypes.slice(0, 4).map((type) => (
              <Button
                key={type}
                variant={activeFilter === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange(type)}
                className="h-7 px-3 text-xs"
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="ml-auto text-sm text-gray-500">
            {hasActiveFilters ? (
              <span>
                Showing {filteredCount} of {totalItems} activities
              </span>
            ) : (
              <span>{totalItems} activities total</span>
            )}
          </div>

          {/* Clear All */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearSearch();
                clearFilters();
              }}
              className="h-7 px-3 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}; 