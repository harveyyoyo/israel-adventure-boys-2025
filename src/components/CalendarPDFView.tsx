import { Card, CardContent } from '@/components/ui/card';
import { ItineraryItem } from '@/data/itineraryData';
import { 
  Heart, 
  Mountain, 
  GraduationCap, 
  Coffee, 
  Plane, 
  Palette,
  MapPin
} from 'lucide-react';

interface CalendarPDFViewProps {
  items: ItineraryItem[];
}

export const CalendarPDFView = ({ items }: CalendarPDFViewProps) => {
  // Helper function to normalize dates for comparison
  const normalizeDate = (date: Date) => {
    // Create a new date object using the year, month, and day components
    // This ensures we get the local date without timezone issues
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  // Filter out "9 days" events
  const filteredItems = items.filter(item => 
    !item.title.toLowerCase().includes('9 days')
  );

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

  const getTypeColor = (type: string) => {
    const colors = {
      spiritual: 'bg-purple-200 text-purple-800 border-purple-300',
      adventure: 'bg-green-200 text-green-800 border-green-300',
      educational: 'bg-blue-200 text-blue-800 border-blue-300',
      leisure: 'bg-orange-200 text-orange-800 border-orange-300',
      travel: 'bg-indigo-200 text-indigo-800 border-indigo-300',
      cultural: 'bg-pink-200 text-pink-800 border-pink-300'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-200 text-gray-800 border-gray-300';
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

  const getEventEmoji = (title: string, type: string) => {
    const titleLower = title.toLowerCase();
    
    // Single, fun and engaging event emojis
    if (titleLower.includes('shabbos')) return '🕯️';
    if (titleLower.includes('tzfat') || titleLower.includes('tzfas')) return '🏔️';
    if (titleLower.includes('wall') || titleLower.includes('kotel')) return '🕊️';
    if (titleLower.includes('museum')) return '🏛️';
    if (titleLower.includes('market') || titleLower.includes('shuk')) return '🛒';
    if (titleLower.includes('beach') || titleLower.includes('eilat')) return '🏖️';
    if (titleLower.includes('hike') || titleLower.includes('hiking')) return '🥾';
    if (titleLower.includes('yurts') || titleLower.includes('overnight')) return '⛺';
    if (titleLower.includes('old city')) return '🏰';
    if (titleLower.includes('flight') || titleLower.includes('travel')) return '✈️';
    if (titleLower.includes('pool') || titleLower.includes('swim')) return '🏊';
    if (titleLower.includes('meal') || titleLower.includes('dinner')) return '🍽️';
    if (titleLower.includes('tour')) return '🚌';
    if (titleLower.includes('activity')) return '🎯';
    if (titleLower.includes('masada')) return '🏜️';
    if (titleLower.includes('dead sea')) return '🌊';
    if (titleLower.includes('golan')) return '⛰️';
    if (titleLower.includes('rafting')) return '🛶';
    if (titleLower.includes('chocolate')) return '🍫';
    if (titleLower.includes('paintball')) return '🎨';
    if (titleLower.includes('archery')) return '🏹';
    if (titleLower.includes('donkey')) return '🦙';
    if (titleLower.includes('snorkeling')) return '🤿';
    if (titleLower.includes('scuba')) return '🤿';
    if (titleLower.includes('glass')) return '🪟';
    if (titleLower.includes('dig')) return '⛏️';
    if (titleLower.includes('atv')) return '🏎️';
    if (titleLower.includes('boat')) return '⛵';
    if (titleLower.includes('sailing')) return '⛵';
    if (titleLower.includes('bonfire')) return '🔥';
    if (titleLower.includes('smores')) return '🍫';
    if (titleLower.includes('kumzits')) return '🎵';
    if (titleLower.includes('learning')) return '📖';
    if (titleLower.includes('shiur')) return '📚';
    if (titleLower.includes('davening')) return '🙏';
    if (titleLower.includes('kiddush')) return '🍷';
    if (titleLower.includes('fabrengen')) return '🎉';
    if (titleLower.includes('orientation')) return '📋';
    if (titleLower.includes('welcome')) return '👋';
    if (titleLower.includes('boys start')) return '🚀';
    if (titleLower.includes('boys end')) return '🏁';
    if (titleLower.includes('flight')) return '✈️';
    if (titleLower.includes('camp day')) return '🏕️';
    if (titleLower.includes('chill day')) return '😌';
    if (titleLower.includes('talent show')) return '🎭';
    if (titleLower.includes('improv')) return '🎪';
    if (titleLower.includes('dodgeball')) return '⚾';
    if (titleLower.includes('capture the counselor')) return '🎯';
    if (titleLower.includes('banana boating')) return '🍌';
    if (titleLower.includes('fear factor')) return '😱';
    if (titleLower.includes('stomp')) return '👟';
    if (titleLower.includes('water sports')) return '🏄';
    if (titleLower.includes('ice mall')) return '❄️';
    if (titleLower.includes('dolphins')) return '🐬';
    if (titleLower.includes('bbq')) return '🍖';
    if (titleLower.includes('pizza')) return '🍕';
    if (titleLower.includes('sushi')) return '🍣';
    if (titleLower.includes('forest walk')) return '🌲';
    if (titleLower.includes('nap')) return '😴';
    if (titleLower.includes('natural spring')) return '💧';
    if (titleLower.includes('cave')) return '🕳️';
    if (titleLower.includes('haunted house')) return '👻';
    if (titleLower.includes('blind museum')) return '🕶️';
    if (titleLower.includes('nova festival')) return '🎪';
    if (titleLower.includes('memorial')) return '🕊️';
    if (titleLower.includes('sderot')) return '🏘️';
    if (titleLower.includes('yad v\'shem')) return '🕯️';
    if (titleLower.includes('tisha bav')) return '🕊️';
    if (titleLower.includes('hidden waterfall')) return '🌊';
    if (titleLower.includes('black canyon')) return '🏔️';
    if (titleLower.includes('party boat')) return '🎉';
    if (titleLower.includes('grape harvest')) return '🍇';
    if (titleLower.includes('red canyon')) return '🏜️';
    if (titleLower.includes('timna park')) return '🏞️';
    
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

  // Generate calendar days starting from July 7, 2025 to August 18, 2025
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

  const calendarDays = generateCalendarDays();

  return (
    <div className="w-full min-h-screen bg-white p-4">
      {/* Enhanced Header with Logo */}
      <div className="text-center mb-6 border-b-4 border-blue-600 pb-4">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <img 
            src="https://campsdeichemed.com/wp-content/uploads/2022/09/sdei-chemed-logo-3.png" 
            alt="Camp Sdei Chemed Logo" 
            className="h-20 w-auto shadow-lg rounded-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          Camp Sdei Chemed - Boys 2025
        </h1>
        <p className="text-lg text-blue-600 font-semibold mb-2">Summer Itinerary Calendar</p>
        <p className="text-md text-gray-600">July 7 - August 18, 2025</p>
      </div>

      <Card className="overflow-hidden shadow-lg border-2 border-gray-300">
        <CardContent className="p-0">
          {/* Enhanced Header Row */}
          <div className="grid grid-cols-7 bg-gradient-to-r from-blue-600 to-purple-600 border-b-2 border-blue-700">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} className={`p-3 text-center text-sm font-bold text-white border-r border-blue-500 last:border-r-0 ${
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
              const isMultiDay = activities.some(activity => activity.isMultiDay);
              const multiDayEvent = activities.find(activity => activity.isMultiDay);
              const primaryEmoji = day ? getPrimaryEmojiForDay(day) : null;
              
              const regularActivities = activities.filter(activity => !activity.isMultiDay);
              const dayOfWeek = day ? day.getDay() : 0;
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              
              const shouldApplyMultiDayBackground = isMultiDay && multiDayEvent;
              
              return (
                <div
                  key={index}
                  className={`min-h-[140px] p-3 border-r border-b border-gray-400 last:border-r-0 flex flex-col relative overflow-hidden ${
                    day ? (isWeekend ? 'bg-pink-50' : 'bg-white') : 'bg-gray-100'
                  } ${
                    shouldApplyMultiDayBackground ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                  }`}
                >
                  {/* Background pattern overlay */}
                  {day && primaryEmoji && (
                    <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-current to-transparent pointer-events-none" />
                  )}
                  
                  {day && (
                    <>
                      {/* Enhanced Date Display */}
                      <div className={`text-lg font-bold mb-3 relative z-10 text-center ${
                        isWeekend ? 'text-blue-700' : 'text-gray-800'
                      }`}>
                        <div className="flex items-center justify-center gap-1">
                          <span>{day.getDate()}</span>
                          {day.getDate() === 7 && day.getMonth() === 6 && (
                            <span className="text-xs text-blue-600 font-bold bg-blue-100 px-2 py-1 rounded-full">Jul</span>
                          )}
                          {day.getDate() === 1 && day.getMonth() === 7 && (
                            <span className="text-xs text-blue-600 font-bold bg-blue-100 px-2 py-1 rounded-full">Aug</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Multi-day Events - show spanning banner only on start day */}
                      {isMultiDay && multiDayEvent && day && isMultiDayEventStart(day, multiDayEvent) && (
                        <div className="absolute top-8 left-0 right-0 z-30 flex items-center justify-center">
                          <div className="text-xs font-bold text-white px-3 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full shadow-lg border border-white">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-2 h-2" />
                              <span>{multiDayEvent.title}</span>
                              <span className="text-xs opacity-75">
                                ({multiDayEvent.fullDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {multiDayEvent.endDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Enhanced Regular Activities */}
                      <div className="space-y-2 flex-1 relative z-10 mt-6">
                        {regularActivities.map(activity => (
                          <div
                            key={activity.id}
                            className={`text-xs p-2 rounded-lg border flex items-center gap-2 leading-tight font-medium ${getTypeColor(activity.type)} bg-white/90 backdrop-blur-sm shadow-sm`}
                          >
                            <span className="text-2xl flex-shrink-0">
                              {getEventEmoji(activity.title, activity.type)}
                            </span>
                            <span className="font-semibold text-xs leading-tight truncate">
                              {activity.title}
                            </span>
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
  );
};
