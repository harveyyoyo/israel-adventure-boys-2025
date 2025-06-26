
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ItineraryItem } from '@/data/itineraryData';

interface CalendarViewProps {
  items: ItineraryItem[];
}

export const CalendarView = ({ items }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // July 2025

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      spiritual: 'bg-blue-100 text-blue-800 border-blue-200',
      adventure: 'bg-orange-100 text-orange-800 border-orange-200',
      educational: 'bg-green-100 text-green-800 border-green-200',
      leisure: 'bg-purple-100 text-purple-800 border-purple-200',
      travel: 'bg-gray-100 text-gray-800 border-gray-200',
      cultural: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[type as keyof typeof colors] || colors.cultural;
  };

  const getMultiDayBackgroundColor = (eventId: string) => {
    const colors = [
      'bg-gradient-to-r from-blue-50 to-indigo-100',
      'bg-gradient-to-r from-green-50 to-emerald-100',
      'bg-gradient-to-r from-purple-50 to-violet-100',
      'bg-gradient-to-r from-orange-50 to-amber-100',
      'bg-gradient-to-r from-pink-50 to-rose-100',
      'bg-gradient-to-r from-teal-50 to-cyan-100',
    ];
    
    // Create a simple hash from the event ID to consistently assign colors
    const hash = eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(day);
    }
    
    return days;
  };

  const getActivitiesForDay = (day: number | null) => {
    if (!day) return [];
    
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    targetDate.setHours(0, 0, 0, 0);
    
    return items.filter(item => {
      const itemDate = new Date(item.fullDate);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === targetDate.getTime();
    });
  };

  const isPartOfMultiDayEvent = (day: number | null) => {
    if (!day) return false;
    
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    targetDate.setHours(0, 0, 0, 0);
    
    return items.some(item => {
      if (!item.isMultiDay) return false;
      
      const itemStartDate = new Date(item.fullDate);
      itemStartDate.setHours(0, 0, 0, 0);
      
      // Parse the date range from the date string for multi-day events
      const dateText = item.date.toLowerCase();
      let endDate = new Date(itemStartDate);
      
      if (dateText.includes('july') && dateText.includes('august')) {
        // Cross-month event
        if (dateText.includes('august 1')) endDate = new Date(2025, 7, 1);
        else if (dateText.includes('august 2')) endDate = new Date(2025, 7, 2);
        else if (dateText.includes('august 6')) endDate = new Date(2025, 7, 6);
        else if (dateText.includes('august 9')) endDate = new Date(2025, 7, 9);
        else if (dateText.includes('august 13')) endDate = new Date(2025, 7, 13);
      } else if (dateText.includes('-')) {
        // Same month range
        const parts = dateText.split('-');
        if (parts.length >= 2) {
          const endPart = parts[1].trim();
          const endDay = parseInt(endPart.match(/\d+/)?.[0] || '0');
          if (endDay > 0) {
            endDate = new Date(itemStartDate.getFullYear(), itemStartDate.getMonth(), endDay);
          }
        }
      }
      
      endDate.setHours(0, 0, 0, 0);
      
      return targetDate >= itemStartDate && targetDate <= endDate;
    });
  };

  const getMultiDayEventForDay = (day: number | null) => {
    if (!day) return null;
    
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    targetDate.setHours(0, 0, 0, 0);
    
    return items.find(item => {
      if (!item.isMultiDay) return false;
      
      const itemStartDate = new Date(item.fullDate);
      itemStartDate.setHours(0, 0, 0, 0);
      
      // Parse the date range from the date string for multi-day events
      const dateText = item.date.toLowerCase();
      let endDate = new Date(itemStartDate);
      
      if (dateText.includes('july') && dateText.includes('august')) {
        // Cross-month event
        if (dateText.includes('august 1')) endDate = new Date(2025, 7, 1);
        else if (dateText.includes('august 2')) endDate = new Date(2025, 7, 2);
        else if (dateText.includes('august 6')) endDate = new Date(2025, 7, 6);
        else if (dateText.includes('august 9')) endDate = new Date(2025, 7, 9);
        else if (dateText.includes('august 13')) endDate = new Date(2025, 7, 13);
      } else if (dateText.includes('-')) {
        // Same month range
        const parts = dateText.split('-');
        if (parts.length >= 2) {
          const endPart = parts[1].trim();
          const endDay = parseInt(endPart.match(/\d+/)?.[0] || '0');
          if (endDay > 0) {
            endDate = new Date(itemStartDate.getFullYear(), itemStartDate.getMonth(), endDay);
          }
        }
      }
      
      endDate.setHours(0, 0, 0, 0);
      
      return targetDate >= itemStartDate && targetDate <= endDate;
    }) || null;
  };

  const days = getDaysInMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('prev')}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <h2 className="text-3xl font-bold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('next')}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Days of week header */}
          <div className="grid grid-cols-7 bg-gray-50 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center font-semibold text-gray-600 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const activities = getActivitiesForDay(day);
              const currentDay = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
              const isToday = currentDay && currentDay.getTime() === today.getTime();
              const isMultiDay = isPartOfMultiDayEvent(day);
              const multiDayEvent = getMultiDayEventForDay(day);
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                    day ? 'bg-white' : 'bg-gray-50'
                  } ${isToday ? 'bg-blue-50 ring-2 ring-blue-200' : ''} ${
                    isMultiDay && multiDayEvent ? getMultiDayBackgroundColor(multiDayEvent.id) : ''
                  }`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-semibold mb-2 ${
                        isToday ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {day}
                      </div>
                      
                      {/* Multi-day event indicator */}
                      {isMultiDay && multiDayEvent && (
                        <div className="mb-2">
                          <div className="text-xs font-medium text-gray-800 px-2 py-1 truncate">
                            {multiDayEvent.title}
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-1">
                        {activities.slice(0, isMultiDay ? 2 : 3).map(activity => (
                          <div
                            key={activity.id}
                            className="text-xs p-1 rounded truncate"
                            title={activity.title}
                          >
                            <Badge 
                              className={`${getTypeColor(activity.type)} text-xs px-1 py-0.5 w-full justify-start`}
                            >
                              {activity.title}
                            </Badge>
                          </div>
                        ))}
                        {activities.length > (isMultiDay ? 2 : 3) && (
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <div className="text-xs text-gray-500 px-1 cursor-pointer hover:text-gray-700">
                                +{activities.length - (isMultiDay ? 2 : 3)} more
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Additional Activities</h4>
                                <div className="space-y-1">
                                  {activities.slice(isMultiDay ? 2 : 3).map(activity => (
                                    <div key={activity.id} className="flex items-center gap-2">
                                      <div className={`w-3 h-3 rounded-full ${
                                        activity.type === 'spiritual' ? 'bg-blue-400' :
                                        activity.type === 'adventure' ? 'bg-orange-400' :
                                        activity.type === 'educational' ? 'bg-green-400' :
                                        activity.type === 'leisure' ? 'bg-purple-400' :
                                        activity.type === 'travel' ? 'bg-gray-400' :
                                        'bg-yellow-400'
                                      }`} />
                                      <span className="text-sm">{activity.title}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
