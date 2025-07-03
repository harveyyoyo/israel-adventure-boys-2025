import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Printer, 
  Calendar as CalendarIcon, 
  FileText, 
  Share2,
  Smartphone,
  Mail
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ItineraryItem } from "@/data/itineraryData";

interface ExportOptionsProps {
  items: ItineraryItem[];
  className?: string;
}

export const ExportOptions = ({ items, className = "" }: ExportOptionsProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToICS = () => {
    setIsExporting(true);
    
    // Create ICS content
    let icsContent = "BEGIN:VCALENDAR\r\n";
    icsContent += "VERSION:2.0\r\n";
    icsContent += "PRODID:-//Camp Sdei Chemed//Itinerary//EN\r\n";
    icsContent += "CALSCALE:GREGORIAN\r\n";
    icsContent += "METHOD:PUBLISH\r\n";
    
    items.forEach((item) => {
      const startDate = item.fullDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      // Default to 1 hour duration if not specified
      const endDate = new Date(item.fullDate.getTime() + 60 * 60000)
        .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      
      icsContent += "BEGIN:VEVENT\r\n";
      icsContent += `UID:${item.id}@camp-sdei-chemed.com\r\n`;
      icsContent += `DTSTART:${startDate}\r\n`;
      icsContent += `DTEND:${endDate}\r\n`;
      icsContent += `SUMMARY:${item.title}\r\n`;
      icsContent += `CATEGORIES:${item.type}\r\n`;
      if (item.isMultiDay && item.endDate) {
        icsContent += `DTEND:${item.endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\r\n`;
      }
      icsContent += "END:VEVENT\r\n";
    });
    
    icsContent += "END:VCALENDAR\r\n";
    
    // Download file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'camp-sdei-chemed-itinerary.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
  };

  const exportToCSV = () => {
    setIsExporting(true);
    
    const csvContent = [
      ['Date', 'Time', 'Title', 'Type', 'Multi-Day'],
      ...items.map(item => [
        item.fullDate.toLocaleDateString(),
        item.fullDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        item.title,
        item.type,
        item.isMultiDay ? 'Yes' : 'No'
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'camp-sdei-chemed-itinerary.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
  };

  const printItinerary = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Camp Sdei Chemed Itinerary</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .activity { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
            .date { font-weight: bold; color: #2563eb; margin-bottom: 10px; }
            .title { font-size: 18px; font-weight: bold; margin-bottom: 5px; }
            .time { color: #666; margin-bottom: 5px; }
            .type { color: #666; margin-bottom: 5px; }
            .multiday { color: #dc2626; font-weight: bold; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Camp Sdei Chemed - Boys 2025</h1>
            <h2>Itinerary & Schedule</h2>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          ${items.map(item => `
            <div class="activity">
              <div class="date">${item.fullDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
              <div class="title">${item.title}</div>
              <div class="time">${item.fullDate.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</div>
              <div class="type">Type: ${item.type}</div>
              ${item.isMultiDay ? '<div class="multiday">Multi-day Event</div>' : ''}
            </div>
          `).join('')}
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const shareItinerary = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Camp Sdei Chemed Itinerary',
        text: `Check out our ${items.length} activities for Camp Sdei Chemed Boys 2025!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
            {isExporting && <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={exportToICS}>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Export to Calendar (.ics)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={exportToCSV}>
            <FileText className="w-4 h-4 mr-2" />
            Export to CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={printItinerary}>
            <Printer className="w-4 h-4 mr-2" />
            Print Itinerary
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareItinerary}>
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Quick Action Buttons */}
      <div className="flex gap-2 mt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={printItinerary}
          className="flex items-center gap-1 text-xs"
        >
          <Printer className="w-3 h-3" />
          Print
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={exportToICS}
          className="flex items-center gap-1 text-xs"
        >
          <CalendarIcon className="w-3 h-3" />
          Calendar
        </Button>
      </div>
    </div>
  );
}; 