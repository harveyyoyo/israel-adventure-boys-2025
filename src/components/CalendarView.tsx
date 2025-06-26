
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
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
  Edit3
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
    return <IconComponent className="w-3 h-3" />;
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
    
    const hash = eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const parseDate = (dateString: string) => {
    // Handle various date formats from the itinerary data
    const dateText = dateString.toLowerCase();
    
    // Extract month and day patterns
    const monthMap: { [key: string]: number } = {
      'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
      'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
    };
    
    // Find month in the string
    let month = -1;
    let day = 1;
    const year = 2025;
    
    for (const [monthName, monthIndex] of Object.entries(monthMap)) {
      if (dateText.includes(monthName)) {
        month = monthIndex;
        break;
      }
    }
    
    // Extract day number
    const dayMatch = dateText.match(/\b(\d{1,2})\b/);
    if (dayMatch) {
      day = parseInt(dayMatch[1]);
    }
    
    // Handle special cases
    if (month === -1) {
      // If no month found, try to use the fullDate
      return null;
    }
    
    return new Date(year, month, day);
  };

  const parseMultiDayRange = (dateString: string, startDate: Date) => {
    const dateText = dateString.toLowerCase();
    let endDate = new Date(startDate);
    
    // Handle range patterns like "July 9-10" or "August 11-13"
    const rangeMatch = dateText.match(/(\w+)\s+(\d+)-(\d+)/);
    if (rangeMatch) {
      const endDay = parseInt(rangeMatch[3]);
      endDate = new Date(startDate.getFullYear(), startDate.getMonth(), endDay);
      return endDate;
    }
    
    // Handle cross-month ranges like "July 27 - August 1"
    if (dateText.includes('july') && dateText.includes('august')) {
      const augustMatch = dateText.match(/august\s+(\d+)/);
      if (augustMatch) {
        const augustDay = parseInt(augustMatch[1]);
        endDate = new Date(2025, 7, augustDay); // August is month 7
        return endDate;
      }
    }
    
    // Handle specific known multi-day events
    if (dateText.includes('eilat')) {
      endDate = new Date(2025, 7, 13); // August 13
    } else if (dateText.includes('north overnight') && dateText.includes('august 4')) {
      endDate = new Date(2025, 7, 6); // August 6
    } else if (dateText.includes('off shabbos') && dateText.includes('august 8')) {
      endDate = new Date(2025, 7, 9); // August 9
    } else if (dateText.includes('old city shabbos')) {
      endDate = new Date(2025, 7, 2); // August 2
    } else if (dateText.includes('tzfat') && dateText.includes('july 24')) {
      endDate = new Date(2025, 6, 27); // July 27
    } else if (dateText.includes('9 days')) {
      endDate = new Date(2025, 7, 1); // August 1
    } else if (dateText.includes('shabbos migdal')) {
      endDate = new Date(2025, 6, 21); // July 21
    }
    
    return endDate;
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
    targetDate.setHours(0, 0, 0, 0);
    
    return items.filter(item => {
      // First check if the item's fullDate matches the target date
      const itemDate = new Date(item.fullDate);
      itemDate.setHours(0, 0, 0, 0);
      
      if (itemDate.getTime() === targetDate.getTime()) {
        return true;
      }
      
      // Also check if it's part of a multi-day event
      if (item.isMultiDay) {
        const startDate = new Date(item.fullDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = parseMultiDayRange(item.date, startDate);
        endDate.setHours(0, 0, 0, 0);
        
        return targetDate >= startDate && targetDate <= endDate;
      }
      
      return false;
    });
  };

  const isPartOfMultiDayEvent = (year: number, month: number, day: number | null) => {
    if (!day) return false;
    
    const targetDate = new Date(year, month, day);
    targetDate.setHours(0, 0, 0, 0);
    
    return items.some(item => {
      if (!item.isMultiDay) return false;
      
      const itemStartDate = new Date(item.fullDate);
      itemStartDate.setHours(0, 0, 0, 0);
      
      const endDate = parseMultiDayRange(item.date, itemStartDate);
      endDate.setHours(0, 0, 0, 0);
      
      return targetDate >= itemStartDate && targetDate <= endDate;
    });
  };

  const getMultiDayEventForDay = (year: number, month: number, day: number | null) => {
    if (!day) return null;
    
    const targetDate = new Date(year, month, day);
    targetDate.setHours(0, 0, 0, 0);
    
    return items.find(item => {
      if (!item.isMultiDay) return false;
      
      const itemStartDate = new Date(item.fullDate);
      itemStartDate.setHours(0, 0, 0, 0);
      
      const endDate = parseMultiDayRange(item.date, itemStartDate);
      endDate.setHours(0, 0, 0, 0);
      
      return targetDate >= itemStartDate && targetDate <= endDate;
    }) || null;
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

  // Only show July and August 2025
  const monthsToShow = [
    { year: 2025, month: 6 }, // July
    { year: 2025, month: 7 }, // August
  ];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-0">
      {monthsToShow.map(({ year, month }) => {
        const days = getDaysInMonth(year, month);
        
        return (
          <div key={`${year}-${month}`} className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {monthNames[month]} {year}
            </h2>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-7 bg-gray-50 border-b">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center font-semibold text-gray-600 border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {days.map((day, index) => {
                    const activities = getActivitiesForDay(year, month, day);
                    const currentDay = day ? new Date(year, month, day) : null;
                    const isToday = currentDay && currentDay.getTime() === today.getTime();
                    const isMultiDay = isPartOfMultiDayEvent(year, month, day);
                    const multiDayEvent = getMultiDayEventForDay(year, month, day);
                    
                    // Filter out multi-day events from regular activities to avoid duplication
                    const regularActivities = activities.filter(activity => !activity.isMultiDay);
                    
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
                            
                            {isMultiDay && multiDayEvent && (
                              <div className="mb-2 flex items-center justify-between">
                                <div className="text-xs font-medium text-gray-800 px-2 py-1 truncate flex-1">
                                  {multiDayEvent.title}
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleEditClick(multiDayEvent)}
                                >
                                  <Edit3 className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                            
                            <div className="space-y-1">
                              {regularActivities.slice(0, isMultiDay ? 2 : 3).map(activity => (
                                <div
                                  key={activity.id}
                                  className="text-xs p-1 rounded truncate flex items-center justify-between group"
                                >
                                  <Badge 
                                    className={`${getTypeColor(activity.type)} text-xs px-1 py-0.5 flex-1 justify-start gap-1`}
                                  >
                                    {getTypeIcon(activity.type)}
                                    {activity.title}
                                  </Badge>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                                    onClick={() => handleEditClick(activity)}
                                  >
                                    <Edit3 className="w-2 h-2" />
                                  </Button>
                                </div>
                              ))}
                              {regularActivities.length > (isMultiDay ? 2 : 3) && (
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <div className="text-xs text-gray-500 px-1 cursor-pointer hover:text-gray-700">
                                      +{regularActivities.length - (isMultiDay ? 2 : 3)} more
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-80">
                                    <div className="space-y-2">
                                      <h4 className="font-semibold text-sm">Additional Activities</h4>
                                      <div className="space-y-1">
                                        {regularActivities.slice(isMultiDay ? 2 : 3).map(activity => (
                                          <div key={activity.id} className="flex items-center gap-2 justify-between group">
                                            <div className="flex items-center gap-2">
                                              {getTypeIcon(activity.type)}
                                              <span className="text-sm">{activity.title}</span>
                                            </div>
                                            <Button 
                                              size="sm" 
                                              variant="ghost" 
                                              className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                                              onClick={() => handleEditClick(activity)}
                                            >
                                              <Edit3 className="w-2 h-2" />
                                            </Button>
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
      })}
      
      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent>
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
