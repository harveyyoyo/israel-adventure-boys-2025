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

interface CalendarViewProps {
  items: ItineraryItem[];
  onUpdateItem: (id: string, updates: Partial<ItineraryItem>) => void;
}

export const CalendarView = ({ items, onUpdateItem }: CalendarViewProps) => {
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    date: '',
    type: '' as ItineraryItem['type']
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
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
    
    // Type-based fallback emojis
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

  const handleEditClick = (item: ItineraryItem) => {
    setEditingItem(item);
    setEditForm({
      title: item.title,
      date: item.date,
      type: item.type
    });
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    const updatedItem = {
      ...editForm,
      fullDate: new Date(editForm.date)
    };
    
    onUpdateItem(editingItem.id, updatedItem);
    setEditingItem(null);
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

            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const activities = day ? getActivitiesForDay(day) : [];
                const isToday = day && normalizeDate(day).getTime() === normalizedToday.getTime();
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
                    className={`min-h-[200px] p-3 border-r border-b last:border-r-0 flex flex-col relative overflow-hidden ${
                      day ? (isWeekend ? 'bg-pink-50' : 'bg-white') : 'bg-gray-50'
                    } ${isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''} ${
                      shouldApplyMultiDayBackground ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                    } hover:shadow-md transition-all duration-200`}
                  >
                    {/* Background pattern overlay */}
                    {day && primaryEmoji && (
                      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-current to-transparent pointer-events-none" />
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
                        
                        {/* Multi-day events - show on ALL days they span */}
                        {isMultiDay && multiDayEvent && (
                          <div className="mb-3 flex items-center justify-between relative z-10">
                            <div className="text-xs font-semibold text-gray-900 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm flex-1">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-blue-600" />
                                <span>{multiDayEvent.title}</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 w-6 p-0 print:hidden bg-white/80 backdrop-blur-sm"
                              onClick={() => handleEditClick(multiDayEvent)}
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        
                        <div className="space-y-2 flex-1 relative z-10">
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
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 flex-shrink-0 print:hidden"
                                onClick={() => handleEditClick(activity)}
                              >
                                <Edit3 className="w-2 h-2" />
                              </Button>
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
      
      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="print:hidden">
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={editForm.date}
                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={editForm.type} onValueChange={(value: ItineraryItem['type']) => setEditForm({ ...editForm, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spiritual">Spiritual</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="leisure">Leisure</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
