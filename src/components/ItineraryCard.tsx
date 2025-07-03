import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ItineraryItem } from "@/data/itineraryData";
import { 
  Calendar, 
  MapPin
} from "lucide-react";
import { getEventEmoji } from '@/utils/emojiUtils';

interface ItineraryCardProps {
  item: ItineraryItem;
  isPast: boolean;
  isToday: boolean;
  onUpdateItem: (id: string, updates: Partial<ItineraryItem>) => void;
  hideDate?: boolean;
}

export const ItineraryCard = ({ item, isPast, isToday, onUpdateItem, hideDate = false }: ItineraryCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${
      isPast ? 'opacity-60' : ''
    } ${
      isToday ? 'ring-2 ring-blue-400 shadow-lg' : ''
    }`}>
      <CardContent className="p-3 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-gray-100">
                <span className="text-lg sm:text-2xl">
                  {getEventEmoji(item.title, item.type)}
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
        
        {!hideDate && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{item.date}</span>
            </div>
            {item.isMultiDay && (
              <Badge variant="outline" className="text-xs w-fit">
                Multi-day event
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
