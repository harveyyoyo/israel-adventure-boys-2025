
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ItineraryItem {
  title: string;
  date: string;
  type: 'spiritual' | 'adventure' | 'educational' | 'leisure' | 'travel' | 'cultural';
  isMultiDay?: boolean;
}

interface ItineraryCardProps {
  item: ItineraryItem;
  isPast: boolean;
  isToday: boolean;
}

export const ItineraryCard = ({ item, isPast, isToday }: ItineraryCardProps) => {
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
    switch (type) {
      case 'spiritual': return '🕊️';
      case 'adventure': return '🏔️';
      case 'educational': return '📚';
      case 'leisure': return '🏖️';
      case 'travel': return '✈️';
      case 'cultural': return '🏛️';
      default: return '📅';
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg border-l-4 ${
      isToday ? 'border-l-blue-500 bg-blue-50' : 
      isPast ? 'border-l-gray-300 opacity-75' : 'border-l-orange-400'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getTypeIcon(item.type)}</span>
            <CardTitle className={`text-lg ${isPast ? 'text-gray-600' : 'text-gray-900'}`}>
              {item.title}
            </CardTitle>
          </div>
          <Badge className={`${getTypeColor(item.type)} text-xs font-medium`}>
            {item.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{item.date}</span>
          </div>
          {item.isMultiDay && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Multi-day</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
