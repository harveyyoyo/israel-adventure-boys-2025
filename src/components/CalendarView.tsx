
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      spiritual: 'bg-blue-500 text-white border-blue-600',
      adventure: 'bg-orange-500 text-white border-orange-600',
      educational: 'bg-green-500 text-white border-green-600',
      leisure: 'bg-purple-500 text-white border-purple-600',
      travel: 'bg-gray-500 text-white border-gray-600',
      cultural: 'bg-yellow-500 text-white border-yellow-600'
    };
    return colors[type as keyof typeof colors] || colors.cultural;
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

  const getMultiDayEvents = () => {
    const multiDayEvents = items.filter(item => item.isMultiDay);
    const events = [];

    for (const event of multiDayEvents) {
      const startDate = new Date(event.fullDate);
      startDate.setHours(0, 0, 0, 0);
      
      // Parse end date from the date string for multi-day events
      let endDate = new Date(startDate);
      if (event.date.includes('-')) {
        const dateRange = event.date.split(' - ')[1] || event.date.split('-')[1];
        if (dateRange) {
          const year = startDate.getFullYear();
          const endDateStr = dateRange.trim();
          
          // Handle various date formats
          if (endDateStr.includes(',')) {
            endDate = new Date(endDateStr);
          } else {
            // Handle formats like "July 10" or "10"
            const monthMatch = endDateStr.match(/([A-Za-z]+)\s+(\d+)/);
            if (monthMatch) {
              const monthName = monthMatch[1];
              const day = parseInt(monthMatch[2]);
              const monthIndex = monthNames.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase()));
              endDate = new Date(year, monthIndex, day);
            } else {
              // Just a day number, same month
              const dayMatch = endDateStr.match(/(\d+)/);
              if (dayMatch) {
                endDate = new Date(year, startDate.getMonth(), parseInt(dayMatch[1]));
              }
            }
          }
        }
      }
      
      endDate.setHours(0, 0, 0, 0);
      
      // Only include events that span within the current month
      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      if (startDate <= monthEnd && endDate >= monthStart) {
        events.push({
          ...event,
          startDate,
          endDate,
          duration: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        });
      }
    }

    return events;
  };

  const days = getDaysInMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const multiDayEvents = getMultiDayEvents();

  const isDateInMultiDayEvent = (day: number | null, multiDayEvent: any) => {
    if (!day) return false;
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate >= multiDayEvent.startDate && targetDate <= multiDayEvent.endDate;
  };

  const getMultiDayEventPosition = (day: number | null, multiDayEvent: any) => {
    if (!day) return null;
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    targetDate.setHours(0, 0, 0, 0);
    
    if (targetDate.getTime() === multiDayEvent.startDate.getTime()) return 'start';
    if (targetDate.getTime() === multiDayEvent.endDate.getTime()) return 'end';
    if (targetDate > multiDayEvent.startDate && targetDate < multiDayEvent.endDate) return 'middle';
    return null;
  };

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
              const activities = getActivitiesForDay(day).filter(activity => !activity.isMultiDay);
              const currentDay = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
              const isToday = currentDay && currentDay.getTime() === today.getTime();
              
              return (
                <div
                  key={index}
                  className={`min-h-[140px] p-2 border-r border-b last:border-r-0 relative ${
                    day ? 'bg-white' : 'bg-gray-50'
                  } ${isToday ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-semibold mb-2 ${
                        isToday ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {day}
                      </div>
                      
                      {/* Multi-day events */}
                      <div className="space-y-1 mb-2">
                        {multiDayEvents.map((event, eventIndex) => {
                          const position = getMultiDayEventPosition(day, event);
                          if (!position) return null;
                          
                          return (
                            <div
                              key={`${event.id}-${eventIndex}`}
                              className={`relative h-6 flex items-center text-xs font-medium px-2 ${getTypeColor(event.type)} ${
                                position === 'start' ? 'rounded-l-md' : ''
                              } ${
                                position === 'end' ? 'rounded-r-md' : ''
                              } ${
                                position === 'middle' ? '' : ''
                              }`}
                              title={`${event.title} (${event.date})`}
                            >
                              {position === 'start' && (
                                <span className="truncate">{event.title}</span>
                              )}
                              {position === 'middle' && (
                                <div className="w-full h-1 bg-current opacity-50"></div>
                              )}
                              {position === 'end' && event.duration <= 3 && (
                                <span className="truncate text-right ml-auto">{event.duration}d</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Single day activities */}
                      <div className="space-y-1">
                        {activities.slice(0, 2).map(activity => (
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
                        {activities.length > 2 && (
                          <div className="text-xs text-gray-500 px-1">
                            +{activities.length - 2} more
                          </div>
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
