import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ItineraryItem } from '@/data/itineraryData';
import { 
  Heart, 
  Mountain, 
  GraduationCap, 
  Coffee, 
  Plane, 
  Palette,
  Edit3,
  Download,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import { getEventEmoji } from '@/utils/emojiUtils';

interface CalendarViewProps {
  items: ItineraryItem[];
  onUpdateItem: (id: string, updates: Partial<ItineraryItem>) => void;
}

export const CalendarView = ({ items, onUpdateItem }: CalendarViewProps) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const activityTypes = [
    { value: 'spiritual', label: 'Spiritual', icon: Heart },
    { value: 'adventure', label: 'Adventure', icon: Mountain },
    { value: 'educational', label: 'Educational', icon: GraduationCap },
    { value: 'leisure', label: 'Leisure', icon: Coffee },
    { value: 'travel', label: 'Travel', icon: Plane },
    { value: 'cultural', label: 'Cultural', icon: Palette }
  ];

  // Helper function to normalize dates for comparison
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  // Filter out "9 days" events
  const filteredItems = items.filter(item => 
    !item.title.toLowerCase().includes('9 days')
  );

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

  const getTypeIcon = (type: string) => {
    const icons = {
      spiritual: Heart,
      adventure: Mountain,
      educational: GraduationCap,
      leisure: Coffee,
      travel: Plane,
      cultural: Palette
    };
    const IconComponent = icons[type as keyof typeof icons] || Palette;
    return <IconComponent className="w-2 h-2" />;
  };

  const getMultiDayBackgroundColor = (eventTitle: string) => {
    const titleLower = eventTitle.toLowerCase();
    
    // Multi-day event backgrounds: vibrant green, blue, maroon
    if (titleLower.includes('tzfat') || titleLower.includes('tzfas')) {
      return 'bg-gradient-to-br from-emerald-200 to-green-300 border-emerald-400';
    }
    if (titleLower.includes('shabbos')) {
      return 'bg-gradient-to-br from-rose-200 to-red-300 border-rose-400';
    }
    if (titleLower.includes('north overnight') || titleLower.includes('yurts')) {
      return 'bg-gradient-to-br from-lime-200 to-green-300 border-lime-400';
    }
    if (titleLower.includes('old city')) {
      return 'bg-gradient-to-br from-indigo-200 to-blue-300 border-indigo-400';
    }
    if (titleLower.includes('eilat')) {
      return 'bg-gradient-to-br from-teal-200 to-cyan-300 border-teal-400';
    }
    if (titleLower.includes('off shabbos')) {
      return 'bg-gradient-to-br from-pink-200 to-rose-300 border-pink-400';
    }
    
    // Rotate between vibrant colors for other multi-day events
    const colors = [
      'bg-gradient-to-br from-emerald-200 to-green-300 border-emerald-400',
      'bg-gradient-to-br from-sky-200 to-blue-300 border-sky-400',
      'bg-gradient-to-br from-rose-200 to-red-300 border-rose-400',
    ];
    
    const hash = eventTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getActivitiesForDay = (targetDate: Date) => {
    const normalizedTargetDate = normalizeDate(targetDate);
    
    return filteredItems.filter(item => {
      const itemStartDate = normalizeDate(item.fullDate);
      
      // For single-day events, check exact date match
      if (!item.isMultiDay || !item.endDate) {
        return itemStartDate.getTime() === normalizedTargetDate.getTime();
      }
      
      // For multi-day events, check if target date falls within the inclusive range
      const itemEndDate = normalizeDate(item.endDate);
      
      // Check if target date is between start and end dates (inclusive)
      return normalizedTargetDate >= itemStartDate && normalizedTargetDate <= itemEndDate;
    });
  };

  // Helper function to check if a day is the start of a multi-day event
  const isMultiDayEventStart = (targetDate: Date, event: ItineraryItem) => {
    if (!event.isMultiDay || !event.endDate) return false;
    const normalizedTargetDate = normalizeDate(targetDate);
    const itemStartDate = normalizeDate(event.fullDate);
    return normalizedTargetDate.getTime() === itemStartDate.getTime();
  };

  // Helper function to check if a day is the end of a multi-day event
  const isMultiDayEventEnd = (targetDate: Date, event: ItineraryItem) => {
    if (!event.isMultiDay || !event.endDate) return false;
    const normalizedTargetDate = normalizeDate(targetDate);
    const itemEndDate = normalizeDate(event.endDate);
    return normalizedTargetDate.getTime() === itemEndDate.getTime();
  };

  const generateCalendarDays = () => {
    const startDate = new Date(2025, 6, 7); // July 7, 2025
    const endDate = new Date(2025, 7, 18); // August 18, 2025
    const days = [];
    
    // Add empty cells to align the first day with correct day of week
    const firstDayOfWeek = startDate.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days from start to end
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getPrimaryEmojiForDay = (targetDate: Date) => {
    const activities = getActivitiesForDay(targetDate);
    if (activities.length === 0) return null;
    
    // Prioritize multi-day events first
    const multiDayEvent = activities.find(activity => activity.isMultiDay);
    if (multiDayEvent) {
      return getEventEmoji(multiDayEvent.title, multiDayEvent.type);
    }
    
    // Otherwise use the first regular activity
    const regularActivity = activities.find(activity => !activity.isMultiDay);
    if (regularActivity) {
      return getEventEmoji(regularActivity.title, regularActivity.type);
    }
    
    return null;
  };

  const generatePDF = () => {
    window.open('/calendar-pdf', '_self');
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  const normalizedToday = normalizeDate(today);

  return (
    <div className="max-w-7xl mx-auto space-y-0">
      <div className="flex justify-end mb-4 print:hidden">
        <Button onClick={generatePDF} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          View PDF
        </Button>
      </div>

      <div>
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center items-center mb-4">
            <img 
              src="https://campsdeichemed.com/wp-content/uploads/2022/09/sdei-chemed-logo-3.png" 
              alt="Camp Sdei Chemed Logo" 
              className="h-20 w-auto shadow-lg rounded-lg"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Camp Sdei Chemed - Boys 2025
          </h2>
          <p className="text-lg text-gray-600 mb-4">July & August Adventure Calendar</p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Spiritual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Adventure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Educational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Leisure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span>Travel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Cultural</span>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden mb-0 shadow-xl border-0">
          <CardContent className="p-0">
            <div className="grid grid-cols-7 bg-gradient-to-r from-gray-100 to-gray-200 border-b">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center font-bold text-gray-700 border-r last:border-r-0 text-lg">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 relative">
              {calendarDays.map((day, index) => {
                const activities = day ? getActivitiesForDay(day) : [];
                const isToday = day && normalizeDate(day).getTime() === normalizedToday.getTime();
                const isMultiDay = activities.some(activity => activity.isMultiDay);
                const multiDayEvent = activities.find(activity => activity.isMultiDay);
                const primaryEmoji = day ? getPrimaryEmojiForDay(day) : null;
                
                const regularActivities = activities.filter(activity => !activity.isMultiDay);
                const dayOfWeek = day ? day.getDay() : 0;
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                
                // Check if this is a "9 days" event - if so, don't apply multi-day background
                const isNineDays = multiDayEvent && multiDayEvent.title.toLowerCase().includes('9 days');
                const shouldApplyMultiDayBackground = isMultiDay && multiDayEvent && !isNineDays;
                
                return (
                  <div
                    key={index}
                    className={`min-h-[200px] p-3 border-r border-b last:border-r-0 flex flex-col relative overflow-hidden ${
                      day ? (isWeekend ? 'bg-pink-50' : 'bg-white') : 'bg-gray-50'
                    } ${isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''} ${
                      shouldApplyMultiDayBackground ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                    } hover:shadow-md transition-all duration-200`}
                  >
                    {/* Multi-day event overlay indicators */}
                    {isMultiDay && multiDayEvent && day && (
                      <>
                        {/* Left border for start of multi-day event */}
                        {isMultiDayEventStart(day, multiDayEvent) && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 z-20"></div>
                        )}
                        
                        {/* Right border for end of multi-day event */}
                        {isMultiDayEventEnd(day, multiDayEvent) && (
                          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-600 z-20"></div>
                        )}
                        
                        {/* Top border for continuation */}
                        {!isMultiDayEventStart(day, multiDayEvent) && !isMultiDayEventEnd(day, multiDayEvent) && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 z-20"></div>
                        )}
                        
                        {/* Multi-day event banner on start day */}
                        {isMultiDayEventStart(day, multiDayEvent) && (
                          <div className="absolute top-2 left-2 right-2 z-30">
                            <div className="text-xs font-bold text-white px-3 py-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full shadow-lg border border-white backdrop-blur-sm">
                              <div className="flex items-center gap-1 justify-center">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate">{multiDayEvent.title}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    
                    {day && (
                      <>
                        <div className={`text-sm font-bold mb-3 relative z-10 ${
                          isToday ? 'text-blue-700' : isWeekend ? 'text-blue-800' : 'text-gray-800'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-lg">{day.getDate()}</span>
                            {day.getDate() === 7 && day.getMonth() === 6 && (
                              <span className="text-xs text-indigo-600 font-bold bg-indigo-100 px-2 py-1 rounded-full">Jul</span>
                            )}
                            {day.getDate() === 1 && day.getMonth() === 7 && (
                              <span className="text-xs text-indigo-600 font-bold bg-indigo-100 px-2 py-1 rounded-full">Aug</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2 flex-1 relative z-10 mt-8">
                          {regularActivities.map(activity => (
                            <div
                              key={activity.id}
                              className="text-xs p-2 rounded-lg flex items-center justify-between group bg-white/90 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-2xl flex-shrink-0">
                                  {getEventEmoji(activity.title, activity.type)}
                                </span>
                                <Badge 
                                  className={`${getTypeColor(activity.type)} text-xs px-2 py-1 flex-1 justify-start gap-1 min-w-0 font-medium`}
                                >
                                  {getTypeIcon(activity.type)}
                                  <span className="text-xs leading-tight font-semibold truncate">{activity.title}</span>
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Activity count indicator */}
                        {activities.length > 0 && (
                          <div className="absolute top-2 right-2 z-20">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-gray-700 shadow-sm">
                              {activities.length}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
