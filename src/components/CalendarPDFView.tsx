
import { Card, CardContent } from '@/components/ui/card';
import { ItineraryItem } from '@/data/itineraryData';
import { 
  Heart, 
  Mountain, 
  GraduationCap, 
  Coffee, 
  Plane, 
  Palette
} from 'lucide-react';

interface CalendarPDFViewProps {
  items: ItineraryItem[];
}

export const CalendarPDFView = ({ items }: CalendarPDFViewProps) => {
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
    return <IconComponent className="w-1 h-1" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      spiritual: 'bg-purple-200 text-purple-800',
      adventure: 'bg-green-200 text-green-800',
      educational: 'bg-blue-200 text-blue-800',
      leisure: 'bg-orange-200 text-orange-800',
      travel: 'bg-indigo-200 text-indigo-800',
      cultural: 'bg-pink-200 text-pink-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-200 text-gray-800';
  };

  const getMultiDayBackgroundColor = (eventTitle: string) => {
    if (eventTitle.toLowerCase().includes('tzfat') || eventTitle.toLowerCase().includes('tzfas')) {
      return 'bg-purple-100 border-purple-300';
    }
    if (eventTitle.toLowerCase().includes('9 days')) {
      return 'bg-red-100 border-red-300';
    }
    if (eventTitle.toLowerCase().includes('shabbos')) {
      return 'bg-blue-100 border-blue-300';
    }
    if (eventTitle.toLowerCase().includes('north overnight') || eventTitle.toLowerCase().includes('yurts')) {
      return 'bg-green-100 border-green-300';
    }
    if (eventTitle.toLowerCase().includes('old city')) {
      return 'bg-amber-100 border-amber-300';
    }
    if (eventTitle.toLowerCase().includes('eilat')) {
      return 'bg-cyan-100 border-cyan-300';
    }
    if (eventTitle.toLowerCase().includes('off shabbos')) {
      return 'bg-pink-100 border-pink-300';
    }
    
    const colors = [
      'bg-indigo-100 border-indigo-300',
      'bg-emerald-100 border-emerald-300',
      'bg-orange-100 border-orange-300',
      'bg-rose-100 border-rose-300',
      'bg-teal-100 border-teal-300',
    ];
    
    const hash = eventTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getActivitiesForDay = (targetDate: Date) => {
    const targetDateStr = targetDate.toDateString();
    
    return items.filter(item => {
      const itemStartDate = item.fullDate;
      
      // For single-day events, check exact date match
      if (!item.isMultiDay || !item.endDate) {
        return itemStartDate.toDateString() === targetDateStr;
      }
      
      // For multi-day events, check if target date falls within the inclusive range
      const itemEndDate = item.endDate;
      
      // Check if target date is between start and end dates (inclusive)
      return targetDate >= itemStartDate && targetDate <= itemEndDate;
    });
  };

  const getEventEmoji = (title: string, type: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('shabbos')) return '🕯️';
    if (titleLower.includes('tzfat') || titleLower.includes('tzfas')) return '🏔️';
    if (titleLower.includes('wall') || titleLower.includes('kotel')) return '🕊️';
    if (titleLower.includes('museum')) return '🏛️';
    if (titleLower.includes('market') || titleLower.includes('shuk')) return '🛒';
    if (titleLower.includes('beach') || titleLower.includes('eilat')) return '🏖️';
    if (titleLower.includes('hike') || titleLower.includes('hiking')) return '🥾';
    if (titleLower.includes('yurts') || titleLower.includes('overnight')) return '⛺';
    if (titleLower.includes('old city')) return '🏰';
    if (titleLower.includes('9 days')) return '🕊️';
    if (titleLower.includes('flight') || titleLower.includes('travel')) return '✈️';
    if (titleLower.includes('pool') || titleLower.includes('swim')) return '🏊';
    if (titleLower.includes('meal') || titleLower.includes('dinner')) return '🍽️';
    if (titleLower.includes('tour')) return '🚌';
    if (titleLower.includes('activity')) return '🎯';
    
    switch (type) {
      case 'spiritual': return '🙏';
      case 'adventure': return '⛰️';
      case 'educational': return '📚';
      case 'leisure': return '☕';
      case 'travel': return '🚐';
      case 'cultural': return '🎨';
      default: return '📅';
    }
  };

  const getPrimaryEmojiForDay = (targetDate: Date) => {
    const activities = getActivitiesForDay(targetDate);
    if (activities.length === 0) return null;
    
    const multiDayEvent = activities.find(activity => activity.isMultiDay);
    if (multiDayEvent) {
      return getEventEmoji(multiDayEvent.title, multiDayEvent.type);
    }
    
    const regularActivity = activities.find(activity => !activity.isMultiDay);
    if (regularActivity) {
      return getEventEmoji(regularActivity.title, regularActivity.type);
    }
    
    return null;
  };

  // Generate calendar days starting from July 9, 2025 to August 18, 2025
  const generateCalendarDays = () => {
    const startDate = new Date(2025, 6, 9); // July 9, 2025
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

  const calendarDays = generateCalendarDays();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-2">
      <div className="text-center mb-2">
        <h1 className="text-xl font-bold text-indigo-800 mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Camp Sdei Chemed - Boys 2025
        </h1>
        <p className="text-xs text-indigo-600 font-medium">Summer Itinerary Calendar - July & August</p>
      </div>

      <Card className="overflow-hidden shadow-lg border-2 border-indigo-200">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 bg-gradient-to-r from-indigo-500 to-purple-600 border-b border-indigo-300">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} className={`p-1 text-center text-[8px] font-bold text-white border-r border-indigo-300 last:border-r-0 ${
                index === 5 ? 'bg-blue-600' : index === 6 ? 'bg-purple-600' : ''
              }`}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const activities = day ? getActivitiesForDay(day) : [];
              const isMultiDay = activities.some(activity => activity.isMultiDay);
              const multiDayEvent = activities.find(activity => activity.isMultiDay);
              const primaryEmoji = day ? getPrimaryEmojiForDay(day) : null;
              
              const regularActivities = activities.filter(activity => !activity.isMultiDay);
              const dayOfWeek = day ? day.getDay() : 0;
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              
              return (
                <div
                  key={index}
                  className={`h-16 p-0.5 border-r border-b border-gray-300 last:border-r-0 flex flex-col text-[3px] ${
                    day ? (isWeekend ? 'bg-blue-50' : 'bg-white') : 'bg-gray-50'
                  } ${
                    isMultiDay && multiDayEvent ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                  }`}
                >
                  {day && (
                    <>
                      <div className={`text-[7px] font-bold mb-0.5 ${
                        isWeekend ? 'text-blue-700' : 'text-gray-800'
                      }`}>
                        {day.getDate()}
                        {day.getDate() === 9 && day.getMonth() === 6 && (
                          <span className="ml-1 text-[5px] text-indigo-600 font-bold">Jul</span>
                        )}
                        {day.getDate() === 1 && day.getMonth() === 7 && (
                          <span className="ml-1 text-[5px] text-indigo-600 font-bold">Aug</span>
                        )}
                      </div>
                      
                      {isMultiDay && multiDayEvent && (
                        <div className="mb-0.5">
                          <div className="text-[4px] font-semibold text-gray-800 px-0.5 py-0.5 bg-white/70 rounded leading-tight border border-gray-300">
                            {multiDayEvent.title}
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-0.5 flex-1 overflow-hidden">
                        {regularActivities.map(activity => (
                          <div
                            key={activity.id}
                            className={`text-[3px] p-0.5 rounded flex items-center gap-0.5 leading-tight font-medium ${getTypeColor(activity.type)}`}
                          >
                            {getTypeIcon(activity.type)}
                            <span className="font-semibold text-[3px] leading-tight">
                              {activity.title}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {primaryEmoji && (
                        <div className="mt-auto flex justify-center items-center">
                          <span className="text-xs">{primaryEmoji}</span>
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
  );
};
