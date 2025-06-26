
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

  const getActivitiesForDay = (date: Date) => {
    return items.filter(item => {
      const itemStartDate = new Date(item.fullDate);
      
      if (!item.isMultiDay || !item.endDate) {
        return (
          itemStartDate.getFullYear() === date.getFullYear() &&
          itemStartDate.getMonth() === date.getMonth() &&
          itemStartDate.getDate() === date.getDate()
        );
      }
      
      const itemEndDate = new Date(item.endDate);
      return (
        date >= itemStartDate && 
        date <= itemEndDate
      );
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

  const getPrimaryEmojiForDay = (date: Date) => {
    const activities = getActivitiesForDay(date);
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

  // Generate calendar days starting from July 8, 2025 to August 18, 2025
  const generateCalendarDays = () => {
    const startDate = new Date(2025, 6, 8); // July 8, 2025
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
    <div className="w-full min-h-screen bg-white p-2">
      <div className="text-center mb-2">
        <h1 className="text-xl font-bold text-gray-800 mb-1">Camp Sdei Chemed - Boys 2025</h1>
        <p className="text-xs text-gray-600">Summer Itinerary Calendar - July & August</p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-300">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-1 text-center text-[8px] font-bold text-gray-700 border-r border-gray-300 last:border-r-0">
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
              
              return (
                <div
                  key={index}
                  className={`h-16 p-0.5 border-r border-b border-gray-300 last:border-r-0 flex flex-col text-[5px] ${
                    day ? 'bg-white' : 'bg-gray-50'
                  } ${
                    isMultiDay && multiDayEvent ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                  }`}
                >
                  {day && (
                    <>
                      <div className="text-[7px] font-bold mb-0.5 text-gray-800">
                        {day.getDate()}
                        {day.getDate() === 8 && day.getMonth() === 6 && (
                          <span className="ml-1 text-[5px] text-gray-600">Jul</span>
                        )}
                        {day.getDate() === 1 && day.getMonth() === 7 && (
                          <span className="ml-1 text-[5px] text-gray-600">Aug</span>
                        )}
                      </div>
                      
                      {isMultiDay && multiDayEvent && (
                        <div className="mb-0.5">
                          <div className="text-[5px] font-semibold text-gray-800 px-0.5 py-0.5 bg-white/50 rounded leading-tight">
                            {multiDayEvent.title}
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-0.5 flex-1 overflow-hidden">
                        {regularActivities.map(activity => (
                          <div
                            key={activity.id}
                            className="text-[4px] p-0.5 bg-gray-100 rounded flex items-center gap-0.5 leading-tight"
                          >
                            {getTypeIcon(activity.type)}
                            <span className="font-medium">
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
