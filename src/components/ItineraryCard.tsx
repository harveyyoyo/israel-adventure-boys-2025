import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ItineraryItem } from "@/data/itineraryData";
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Mountain, 
  GraduationCap, 
  Coffee, 
  Plane, 
  Palette
} from "lucide-react";

interface ItineraryCardProps {
  item: ItineraryItem;
  isPast: boolean;
  isToday: boolean;
  onUpdateItem: (id: string, updates: Partial<ItineraryItem>) => void;
}

export const ItineraryCard = ({ item, isPast, isToday, onUpdateItem }: ItineraryCardProps) => {
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

  return (
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
  );
};
