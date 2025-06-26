
import { useState } from "react";
import { Calendar, List, Search, Filter, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { FilterTabs } from "@/components/FilterTabs";

interface AppSidebarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activityCounts: Record<string, number>;
  view: 'timeline' | 'calendar';
  onViewChange: (view: 'timeline' | 'calendar') => void;
  itemsCount: number;
  totalCount: number;
}

export function AppSidebar({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activityCounts,
  view,
  onViewChange,
  itemsCount,
  totalCount,
}: AppSidebarProps) {
  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Israel Adventure</h2>
        <p className="text-sm text-gray-600">Boys 2025</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative px-2">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 bg-white border-gray-200"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>View</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('calendar')}
                  isActive={view === 'calendar'}
                >
                  <Calendar className="w-4 h-4" />
                  Calendar View
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('timeline')}
                  isActive={view === 'timeline'}
                >
                  <List className="w-4 h-4" />
                  Timeline View
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Filter Activities</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-2">
              {Object.entries(activityCounts).map(([key, count]) => (
                <button
                  key={key}
                  onClick={() => onFilterChange(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeFilter === key
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="capitalize">{key === 'all' ? 'All Activities' : key}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      {count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-center text-sm text-gray-600">
          Showing {itemsCount} of {totalCount} activities
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
