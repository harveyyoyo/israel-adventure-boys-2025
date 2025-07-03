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
  Users,
  Calendar as CalendarIcon
} from 'lucide-react';
import { getEventEmoji } from '@/utils/emojiUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalendarViewProps {
  items: ItineraryItem[];
  onUpdateItem: (id: string, updates: Partial<ItineraryItem>) => void;
}

export const CalendarView = ({ items, onUpdateItem }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const getMultiDayInvertedColors = (eventTitle: string) => {
    const titleLower = eventTitle.toLowerCase();
    
    // Inverted colors for multi-day events based on their background
    if (titleLower.includes('tzfat') || titleLower.includes('tzfas')) {
      return 'bg-emerald-800 text-white border-emerald-600';
    }
    if (titleLower.includes('shabbos')) {
      return 'bg-rose-800 text-white border-rose-600';
    }
    if (titleLower.includes('north overnight') || titleLower.includes('yurts')) {
      return 'bg-lime-800 text-white border-lime-600';
    }
    if (titleLower.includes('old city')) {
      return 'bg-indigo-800 text-white border-indigo-600';
    }
    if (titleLower.includes('eilat')) {
      return 'bg-teal-800 text-white border-teal-600';
    }
    if (titleLower.includes('off shabbos')) {
      return 'bg-pink-800 text-white border-pink-600';
    }
    
    // Default inverted colors for other multi-day events
    return 'bg-gray-800 text-white border-gray-600';
  };

  const getMultiDayBadgeColors = (eventTitle: string) => {
    const titleLower = eventTitle.toLowerCase();
    
    // Inverted badge colors for multi-day events
    if (titleLower.includes('tzfat') || titleLower.includes('tzfas')) {
      return 'bg-emerald-700 text-white border-emerald-500';
    }
    if (titleLower.includes('shabbos')) {
      return 'bg-rose-700 text-white border-rose-500';
    }
    if (titleLower.includes('north overnight') || titleLower.includes('yurts')) {
      return 'bg-lime-700 text-white border-lime-500';
    }
    if (titleLower.includes('old city')) {
      return 'bg-indigo-700 text-white border-indigo-500';
    }
    if (titleLower.includes('eilat')) {
      return 'bg-teal-700 text-white border-teal-600';
    }
    if (titleLower.includes('off shabbos')) {
      return 'bg-pink-700 text-white border-pink-500';
    }
    
    // Default inverted badge colors
    return 'bg-gray-700 text-white border-gray-500';
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
    window.print();
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  const normalizedToday = normalizeDate(today);

  // Mobile List View Component
  const MobileListView = () => {
    const groupedByMonth = () => {
      const groups: Record<string, { date: Date; activities: ItineraryItem[] }[]> = {};
      
      calendarDays.forEach(day => {
        if (!day) return;
        
        const monthYear = day.toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        });
        
        if (!groups[monthYear]) {
          groups[monthYear] = [];
        }
        
        const activities = getActivitiesForDay(day);
        if (activities.length > 0) {
          groups[monthYear].push({ date: day, activities });
        }
      });
      
      return groups;
    };

    return (
      <div className="space-y-6">
        {Object.entries(groupedByMonth()).map(([monthYear, days]) => (
          <div key={monthYear}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b-2 border-blue-200 pb-2">
              {monthYear}
            </h2>
            <div className="space-y-3">
              {days.map(({ date, activities }) => {
                const isToday = normalizeDate(date).getTime() === normalizedToday.getTime();
                const dayOfWeek = date.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                
                return (
                  <Card 
                    key={date.toISOString()} 
                    className={`${isToday ? 'ring-2 ring-blue-400 shadow-lg' : ''} ${
                      isWeekend ? 'bg-pink-50' : 'bg-white'
                    }`}
                  >
                    <CardContent className="p-4">
                      {/* Date Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`text-2xl font-bold ${
                            isToday ? 'text-blue-700' : isWeekend ? 'text-blue-700' : 'text-gray-800'
                          }`}>
                            {date.getDate()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-600">
                              {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="text-xs text-gray-500">
                              {date.toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                          </div>
                        </div>
                        {isToday && (
                          <Badge className="bg-blue-100 text-blue-800">Today</Badge>
                        )}
                      </div>
                      
                      {/* Activities */}
                      <div className="space-y-1">
                        {activities
                          .sort((a, b) => {
                            if (a.isMultiDay && !b.isMultiDay) return -1;
                            if (!a.isMultiDay && b.isMultiDay) return 1;
                            return 0;
                          })
                          .map(activity => (
                          <div
                            key={activity.id}
                            className={`p-2 rounded border flex items-center gap-2 ${
                              activity.isMultiDay 
                                ? getMultiDayInvertedColors(activity.title)
                                : `${getTypeColor(activity.type)} bg-white/90 backdrop-blur-sm shadow-sm`
                            }`}
                          >
                            <span className="text-lg flex-shrink-0">
                              {getEventEmoji(activity.title, activity.type)}
                            </span>
                            <div className="flex-1">
                              <div className="font-semibold text-sm">
                                {activity.title}
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                {activity.isMultiDay && (
                                  <Badge variant="outline" className="text-xs">
                                    Multi-day
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Mobile Calendar View Component (Emoji-only with tooltips)
  const MobileCalendarView = () => (
    <Card className="overflow-hidden shadow-lg border-2 border-gray-300 print:shadow-none print:border print:border-gray-400">
      <CardContent className="p-0">
        {/* Enhanced Header Row */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-blue-600 to-purple-600 border-b-2 border-blue-700 print:bg-blue-600">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className={`p-1 sm:p-3 text-center text-xs sm:text-sm font-bold text-white border-r border-blue-500 last:border-r-0 print:p-2 print:text-xs ${
              index === 5 ? 'bg-blue-700' : index === 6 ? 'bg-purple-700' : ''
            }`}>
              {day}
            </div>
          ))}
        </div>

        {/* Mobile Calendar Grid - Emoji Only */}
        <TooltipProvider>
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
                  className={`min-h-[60px] sm:min-h-[140px] p-1 sm:p-3 border-r border-b border-gray-400 last:border-r-0 flex flex-col relative overflow-hidden print:min-h-[120px] print:p-2 ${
                    day ? (isWeekend ? 'bg-pink-50' : 'bg-white') : 'bg-gray-100'
                  } ${isToday ? 'ring-2 ring-blue-400 ring-offset-1 sm:ring-offset-2 print:ring-1 print:ring-blue-600' : ''} ${
                    shouldApplyMultiDayBackground ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                  }`}
                >
                  {day && (
                    <>
                      {/* Enhanced Date Display */}
                      <div className={`text-sm sm:text-lg font-bold mb-1 sm:mb-3 relative z-10 text-center print:text-base print:mb-2 ${
                        isToday ? 'text-blue-700' : isWeekend ? 'text-blue-700' : 'text-gray-800'
                      }`}>
                        <div className="flex items-center justify-center gap-1">
                          <span>{day.getDate()}</span>
                          {day.getDate() === 7 && day.getMonth() === 6 && (
                            <span className="text-xs text-blue-600 font-bold bg-blue-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full print:text-xs print:px-1 print:py-0.5">Jul</span>
                          )}
                          {day.getDate() === 1 && day.getMonth() === 7 && (
                            <span className="text-xs text-blue-600 font-bold bg-blue-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full print:text-xs print:px-1 print:py-0.5">Aug</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Mobile: Emoji-only Activities with Tooltips */}
                      <div className="flex flex-wrap gap-1 justify-center items-center flex-1 relative z-10">
                        {activities
                          .sort((a, b) => {
                            // Multi-day events first, then by type
                            if (a.isMultiDay && !b.isMultiDay) return -1;
                            if (!a.isMultiDay && b.isMultiDay) return 1;
                            return 0;
                          })
                          .map(activity => (
                          <Tooltip key={activity.id}>
                            <TooltipTrigger asChild>
                              <div
                                className={`text-lg sm:text-xl p-1 rounded cursor-pointer transition-all hover:scale-110 ${
                                  activity.isMultiDay 
                                    ? 'bg-black/20 text-white'
                                    : 'bg-white/80 shadow-sm'
                                }`}
                              >
                                {getEventEmoji(activity.title, activity.type)}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <div className="space-y-2">
                                <div className="font-semibold text-sm">
                                  {activity.title}
                                </div>
                                <div className="flex items-center gap-2">
                                  {activity.isMultiDay && (
                                    <Badge variant="outline" className="text-xs">
                                      Multi-day
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {activity.date}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );

  // Desktop Grid View Component
  const DesktopGridView = () => (
    <Card className="overflow-hidden shadow-lg border-2 border-gray-300 print:shadow-none print:border print:border-gray-400">
      <CardContent className="p-0">
        {/* Enhanced Header Row */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-blue-600 to-purple-600 border-b-2 border-blue-700 print:bg-blue-600">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className={`p-3 text-center text-sm font-bold text-white border-r border-blue-500 last:border-r-0 print:p-2 print:text-xs ${
              index === 5 ? 'bg-blue-700' : index === 6 ? 'bg-purple-700' : ''
            }`}>
              {day}
            </div>
          ))}
        </div>

        {/* Enhanced Calendar Grid */}
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
                className={`min-h-[140px] p-3 border-r border-b border-gray-400 last:border-r-0 flex flex-col relative overflow-hidden print:min-h-[120px] print:p-2 ${
                  day ? (isWeekend ? 'bg-pink-50' : 'bg-white') : 'bg-gray-100'
                } ${isToday ? 'ring-2 ring-blue-400 ring-offset-2 print:ring-1 print:ring-blue-600' : ''} ${
                  shouldApplyMultiDayBackground ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                }`}
              >
                {day && (
                  <>
                    {/* Enhanced Date Display */}
                    <div className={`text-lg font-bold mb-3 relative z-10 text-center print:text-base print:mb-2 ${
                      isToday ? 'text-blue-700' : isWeekend ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      <div className="flex items-center justify-center gap-1">
                        <span>{day.getDate()}</span>
                        {day.getDate() === 7 && day.getMonth() === 6 && (
                          <span className="text-xs text-blue-600 font-bold bg-blue-100 px-2 py-1 rounded-full print:text-xs print:px-1 print:py-0.5">Jul</span>
                        )}
                        {day.getDate() === 1 && day.getMonth() === 7 && (
                          <span className="text-xs text-blue-600 font-bold bg-blue-100 px-2 py-1 rounded-full print:text-xs print:px-1 print:py-0.5">Aug</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Enhanced Activities */}
                    <div className="space-y-0.5 sm:space-y-1 flex-1 relative z-10 print:space-y-1">
                      {activities
                        .sort((a, b) => {
                          // Multi-day events first, then by type
                          if (a.isMultiDay && !b.isMultiDay) return -1;
                          if (!a.isMultiDay && b.isMultiDay) return 1;
                          return 0;
                        })
                        .map(activity => (
                        <div
                          key={activity.id}
                          className={`text-xs p-0.5 sm:p-1 rounded border flex items-center gap-1 sm:gap-2 leading-tight font-medium print:p-1 print:text-xs ${
                            activity.isMultiDay 
                              ? getMultiDayInvertedColors(activity.title)
                              : `${getTypeColor(activity.type)} bg-white/90 backdrop-blur-sm shadow-sm`
                          }`}
                        >
                          <span className="text-sm sm:text-lg flex-shrink-0 print:text-lg">
                            {getEventEmoji(activity.title, activity.type)}
                          </span>
                          <span className="font-semibold text-xs leading-tight truncate print:text-xs">
                            {activity.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4 print:hidden px-2 sm:px-6">
        <Button onClick={generatePDF} variant="outline" className="flex items-center gap-2 text-xs sm:text-sm">
          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Print Calendar</span>
          <span className="sm:hidden">Print</span>
        </Button>
      </div>

      <div className="w-full min-h-screen bg-white p-2 sm:p-4 print:p-0 print:min-h-0">
        {/* Enhanced Header with Logo */}
        <div className="text-center mb-4 sm:mb-6 border-b-4 border-blue-600 pb-2 sm:pb-4 print:mb-4 print:pb-2">
          {/* Logo */}
          <div className="flex justify-center items-center mb-2 sm:mb-4 print:mb-2">
            <img 
              src="https://campsdeichemed.com/wp-content/uploads/2022/09/sdei-chemed-logo-3.png" 
              alt="Camp Sdei Chemed Logo" 
              className="h-12 w-auto sm:h-20 shadow-lg rounded-lg print:h-16"
            />
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-blue-800 mb-1 sm:mb-2 print:text-2xl print:mb-1">
            Camp Sdei Chemed - Boys 2025
          </h1>
          <p className="text-sm sm:text-lg text-blue-600 font-semibold mb-1 sm:mb-2 print:text-base print:mb-1">Summer Itinerary Calendar</p>
          <p className="text-xs sm:text-md text-gray-600 print:text-sm">July 7 - August 18, 2025</p>
        </div>

        {/* Responsive View */}
        <div className="block lg:hidden">
          <MobileCalendarView />
        </div>
        <div className="hidden lg:block">
          <DesktopGridView />
        </div>
      </div>
    </div>
  );
};
