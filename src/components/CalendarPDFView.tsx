
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
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(day);
    }
    
    return days;
  };

  const getActivitiesForDay = (year: number, month: number, day: number | null) => {
    if (!day) return [];
    
    const targetDate = new Date(year, month, day);
    
    return items.filter(item => {
      const itemStartDate = new Date(item.fullDate);
      
      if (!item.isMultiDay || !item.endDate) {
        return (
          itemStartDate.getFullYear() === targetDate.getFullYear() &&
          itemStartDate.getMonth() === targetDate.getMonth() &&
          itemStartDate.getDate() === targetDate.getDate()
        );
      }
      
      const itemEndDate = new Date(item.endDate);
      return (
        targetDate >= itemStartDate && 
        targetDate <= itemEndDate
      );
    });
  };

  const isPartOfMultiDayEvent = (year: number, month: number, day: number | null) => {
    if (!day) return false;
    const activities = getActivitiesForDay(year, month, day);
    return activities.some(activity => activity.isMultiDay);
  };

  const getMultiDayEventForDay = (year: number, month: number, day: number | null) => {
    if (!day) return null;
    const activities = getActivitiesForDay(year, month, day);
    return activities.find(activity => activity.isMultiDay) || null;
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

  const getPrimaryEmojiForDay = (year: number, month: number, day: number | null) => {
    if (!day) return null;
    
    const activities = getActivitiesForDay(year, month, day);
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

  const monthsToShow = [
    { year: 2025, month: 6 }, // July
    { year: 2025, month: 7 }, // August
  ];

  return (
    <div className="w-full min-h-screen bg-white p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Camp Sdei Chemed - Boys 2025</h1>
        <p className="text-sm text-gray-600">Summer Itinerary Calendar</p>
      </div>

      {monthsToShow.map(({ year, month }) => {
        const days = getDaysInMonth(year, month);
        
        return (
          <div key={`${year}-${month}`} className="mb-6 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
              {monthNames[month]} {year}
            </h2>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-300">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300 last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {days.map((day, index) => {
                    const activities = getActivitiesForDay(year, month, day);
                    const isMultiDay = isPartOfMultiDayEvent(year, month, day);
                    const multiDayEvent = getMultiDayEventForDay(year, month, day);
                    const primaryEmoji = getPrimaryEmojiForDay(year, month, day);
                    
                    const regularActivities = activities.filter(activity => !activity.isMultiDay);
                    
                    return (
                      <div
                        key={index}
                        className={`h-20 p-1 border-r border-b border-gray-300 last:border-r-0 flex flex-col ${
                          day ? 'bg-white' : 'bg-gray-50'
                        } ${
                          isMultiDay && multiDayEvent ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                        }`}
                      >
                        {day && (
                          <>
                            <div className="text-sm font-bold mb-1 text-gray-800">
                              {day}
                            </div>
                            
                            {isMultiDay && multiDayEvent && (
                              <div className="mb-1">
                                <div className="text-[9px] font-semibold text-gray-800 px-1 py-0.5 bg-white/50 rounded truncate leading-tight">
                                  {multiDayEvent.title.length > 12 ? multiDayEvent.title.substring(0, 12) + '...' : multiDayEvent.title}
                                </div>
                              </div>
                            )}
                            
                            <div className="space-y-0.5 flex-1 overflow-hidden">
                              {regularActivities.slice(0, 1).map(activity => (
                                <div
                                  key={activity.id}
                                  className="text-[8px] p-0.5 bg-gray-100 rounded flex items-center gap-0.5 truncate leading-tight"
                                >
                                  {getTypeIcon(activity.type)}
                                  <span className="truncate font-medium">
                                    {activity.title.length > 8 ? activity.title.substring(0, 8) + '...' : activity.title}
                                  </span>
                                </div>
                              ))}
                              {regularActivities.length > 1 && (
                                <div className="text-[8px] text-gray-500 font-medium">
                                  +{regularActivities.length - 1}
                                </div>
                              )}
                            </div>
                            
                            {primaryEmoji && (
                              <div className="mt-auto flex justify-center items-center">
                                <span className="text-lg">{primaryEmoji}</span>
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
      })}
    </div>
  );
};
