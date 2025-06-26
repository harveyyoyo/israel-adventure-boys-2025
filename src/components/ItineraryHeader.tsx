
import { Calendar, MapPin, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ItineraryHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white p-8 rounded-xl mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <img 
            src="https://campsdeichemed.com/wp-content/uploads/2022/09/sdei-chemed-logo-3.png" 
            alt="Camp Sdei Chemed Logo" 
            className="h-24 w-auto"
          />
        </div>
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            CAMP SDEI CHEMED INTERNATIONAL
          </h1>
          <h2 className="text-2xl font-semibold mb-2">
            SUMMER 2025 ITINERARY
          </h2>
          <p className="text-xl font-medium opacity-90">
            "OFF THE BEATEN PATH"
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Duration</div>
              <div className="text-sm opacity-90">42 Days</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Destination</div>
              <div className="text-sm opacity-90">Israel</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Program</div>
              <div className="text-sm opacity-90">Boys Group</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Activities</div>
              <div className="text-sm opacity-90">80+ Events</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
