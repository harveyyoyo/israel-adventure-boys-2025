
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ItineraryItem } from "@/data/itineraryData";
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Mountain, 
  GraduationCap, 
  Coffee, 
  Plane, 
  Palette,
  Edit3
} from "lucide-react";

interface ItineraryCardProps {
  item: ItineraryItem;
  isPast: boolean;
  isToday: boolean;
  onUpdateItem: (id: string, updates: Partial<ItineraryItem>) => void;
}

export const ItineraryCard = ({ item, isPast, isToday, onUpdateItem }: ItineraryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: item.title,
    date: item.date,
    type: item.type
  });

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
    return <IconComponent className="w-5 h-5" />;
  };

  const handleSaveEdit = () => {
    const updatedItem = {
      ...editForm,
      fullDate: new Date(editForm.date)
    };
    
    onUpdateItem(item.id, updatedItem);
    setIsEditing(false);
  };

  return (
    <>
      <Card className={`hover:shadow-lg transition-all duration-300 ${
        isPast ? 'opacity-60' : ''
      } ${
        isToday ? 'ring-2 ring-blue-400 shadow-lg' : ''
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${getTypeColor(item.type).split(' ')[0]}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <Badge className={`${getTypeColor(item.type)} mt-1`}>
                    {item.type}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => {
                setEditForm({
                  title: item.title,
                  date: item.date,
                  type: item.type
                });
                setIsEditing(true);
              }}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{item.date}</span>
            </div>
            {item.isMultiDay && (
              <Badge variant="outline" className="text-xs">
                Multi-day event
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
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
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
