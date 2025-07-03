
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

const getActivityDescription = (title: string, type: string): string => {
  const descriptions: Record<string, string> = {
    // Food activities
    'breakfast': 'Start your day with a delicious morning meal 🍳',
    'lunch': 'Midday fuel to keep your energy up 🥪',
    'dinner': 'End the day with a hearty evening feast 🍽️',
    'snack': 'Quick bite to satisfy those cravings 🍿',
    'bbq': 'Sizzling grilled goodness under the open sky 🔥',
    
    // Travel activities  
    'departure': 'Time to hit the road for your next adventure! 🚌',
    'arrival': 'Welcome to your destination - the fun begins! 🎯',
    'bus': 'Scenic journey with friends and great conversations 🛣️',
    'flight': 'Soar through the clouds to your next chapter ✈️',
    
    // Recreation activities
    'pool': 'Make a splash and cool off in crystal clear water 🏊‍♂️',
    'swimming': 'Dive into refreshing aquatic adventures 💦',
    'beach': 'Sun, sand, and endless summer vibes 🏖️',
    'sports': 'Get competitive and show off your athletic skills ⚡',
    
    // Adventure activities
    'hiking': 'Conquer trails and discover breathtaking views 🥾',
    'climbing': 'Reach new heights and challenge your limits 🧗‍♂️',
    'zip': 'Soar through the treetops at thrilling speeds 💨',
    'rappelling': 'Descend with courage and adrenaline 🪢',
    
    // Educational activities
    'tour': 'Explore fascinating history and hidden stories 🗺️',
    'museum': 'Journey through time and culture 🏛️',
    'learning': 'Expand your mind with new knowledge 💡',
    'workshop': 'Hands-on creativity and skill building 🔨',
    
    // Spiritual activities
    'shabbos': 'Sacred time for reflection and community 🕯️',
    'davening': 'Connect with tradition through prayer 📿',
    'spiritual': 'Moments of peace and inner connection 🙏',
    'religious': 'Honor heritage and faith together ✡️',
    
    // Entertainment activities
    'show': 'Spectacular entertainment awaits! 🎭',
    'performance': 'Witness incredible talent and artistry 🎨',
    'concert': 'Feel the rhythm and let music move you 🎵',
    'movie': 'Lights, camera, action - movie magic time! 🎬',
    
    // Social activities
    'party': 'Celebrate life with friends and laughter 🎉',
    'dance': 'Move to the beat and express yourself 💃',
    'social': 'Build memories through meaningful connections 🤝',
    'gathering': 'Come together for shared experiences 👥',
    
    // Leisure activities
    'free': 'Your time to relax and do whatever brings you joy 😌',
    'rest': 'Recharge your batteries for upcoming adventures 💤',
    'chill': 'Take it easy and enjoy the moment 🛋️',
    'personal': 'Me-time for reflection and self-care 🧘‍♂️'
  };
  
  // Check for exact matches first
  const lowerTitle = title.toLowerCase();
  for (const [key, desc] of Object.entries(descriptions)) {
    if (lowerTitle.includes(key)) {
      return desc;
    }
  }
  
  // Fallback descriptions based on type
  const typeDescriptions: Record<string, string> = {
    food: 'Delicious dining experience awaits! 🍴',
    travel: 'Adventure awaits on the journey ahead! 🚗',
    recreation: 'Time for fun and games! 🎮',
    adventure: 'Thrilling outdoor experience coming up! ⛰️',
    educational: 'Learn something amazing today! 📚',
    spiritual: 'Meaningful moments of reflection 🙏',
    entertainment: 'Get ready to be amazed! 🎪',
    social: 'Connect and make memories with friends! 👫',
    leisure: 'Relax and enjoy some downtime 🌟',
    cultural: 'Immerse yourself in rich traditions! 🎨'
  };
  
  return typeDescriptions[type] || `Exciting ${type} activity - don't miss out! ✨`;
};

export const ItineraryCard = ({ item, isPast, isToday, onUpdateItem, hideDate = false }: ItineraryCardProps) => {
  const description = getActivityDescription(item.title, item.type);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
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
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-3 bg-gray-900 text-white rounded-lg shadow-lg">
          <p className="text-sm font-medium">{description}</p>
          <div className="text-xs text-gray-300 mt-1">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Activity
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
