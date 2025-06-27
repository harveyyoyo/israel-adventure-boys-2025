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
  Download
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
    if (eventTitle.toLowerCase().includes('tzfat') || eventTitle.toLowerCase().includes('tzfas')) {
      return 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200';
    }
    if (eventTitle.toLowerCase().includes('9 days')) {
      return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200';
    }
    if (eventTitle.toLowerCase().includes('shabbos')) {
      return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
    }
    if (eventTitle.toLowerCase().includes('north overnight') || eventTitle.toLowerCase().includes('yurts')) {
      return 'bg-gradient-to-r from-green-50 to-green-100 border-green-200';
    }
    if (eventTitle.toLowerCase().includes('old city')) {
      return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
    }
    if (eventTitle.toLowerCase().includes('eilat')) {
      return 'bg-gradient-to-r from-cyan-50 to-cyan-100 border-cyan-200';
    }
    if (eventTitle.toLowerCase().includes('off shabbos')) {
      return 'bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200';
    }
    
    const colors = [
      'bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200',
      'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200',
      'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200',
      'bg-gradient-to-r from-rose-50 to-rose-100 border-rose-200',
      'bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200',
    ];
    
    const hash = eventTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getActivitiesForDay = (targetDate: Date) => {
    const normalizedTargetDate = normalizeDate(targetDate);
    
    return items.filter(item => {
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

  const getEventEmoji = (title: string, type: string) => {
    const titleLower = title.toLowerCase();
    
    // Specific event emojis
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
    window.open('/calendar-pdf', '_blank');
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  const normalizedToday = normalizeDate(today);

  return (
    <div className="max-w-7xl mx-auto space-y-0">
      <div className="flex justify-end mb-4 print:hidden">
        <Button onClick={generatePDF} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Camp Sdei Chemed - Boys 2025 - July & August
        </h2>

        <Card className="overflow-hidden mb-0">
          <CardContent className="p-0">
            <div className="grid grid-cols-7 bg-gray-50 border-b">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center font-semibold text-gray-600 border-r last:border-r-0">
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
                
                return (
                  <div
                    key={index}
                    className={`min-h-[180px] p-2 border-r border-b last:border-r-0 flex flex-col ${
                      day ? (isWeekend ? 'bg-blue-50' : 'bg-white') : 'bg-gray-50'
                    } ${isToday ? 'bg-blue-100 ring-2 ring-blue-200' : ''} ${
                      isMultiDay && multiDayEvent ? getMultiDayBackgroundColor(multiDayEvent.title) : ''
                    }`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-semibold mb-2 ${
                          isToday ? 'text-blue-600' : isWeekend ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {day.getDate()}
                          {day.getDate() === 9 && day.getMonth() === 6 && (
                            <span className="ml-1 text-xs text-indigo-600 font-bold">Jul</span>
                          )}
                          {day.getDate() === 1 && day.getMonth() === 7 && (
                            <span className="ml-1 text-xs text-indigo-600 font-bold">Aug</span>
                          )}
                        </div>
                        
                        {isMultiDay && multiDayEvent && (
                          <div className="mb-2 flex items-center justify-between print:pr-0">
                            <div className="text-xs font-medium text-gray-800 px-2 py-1 flex-1">
                              <span>{multiDayEvent.title}</span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 w-6 p-0 print:hidden"
                              onClick={() => handleEditClick(multiDayEvent)}
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        
                        <div className="space-y-1 flex-1">
                          {regularActivities.map(activity => (
                            <div
                              key={activity.id}
                              className="text-xs p-1 rounded flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-1 flex-1 min-w-0">
                                <Badge 
                                  className={`${getTypeColor(activity.type)} text-xs px-1 py-0.5 flex-1 justify-start gap-1 min-w-0`}
                                >
                                  {getTypeIcon(activity.type)}
                                  <span className="text-xs leading-tight">{activity.title}</span>
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
                        
                        {primaryEmoji && (
                          <div className="mt-auto pt-2 flex justify-center items-center flex-1 min-h-[40px]">
                            <span className="text-4xl md:text-5xl lg:text-6xl">{primaryEmoji}</span>
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
