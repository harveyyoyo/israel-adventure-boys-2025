
import { Calendar, MapPin, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ItineraryHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white p-8 rounded-xl mb-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Israel Summer Adventure 2025
        </h1>
        <p className="text-xl text-center mb-6 opacity-90">
          An unforgettable journey through the Holy Land
        </p>
        
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
