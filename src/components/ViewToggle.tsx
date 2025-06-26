
import { Button } from '@/components/ui/button';
import { Calendar, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'timeline' | 'calendar';
  onViewChange: (view: 'timeline' | 'calendar') => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-2 mb-6 justify-center">
      <Button
        variant={view === 'timeline' ? 'default' : 'outline'}
        onClick={() => onViewChange('timeline')}
        className="flex items-center gap-2"
      >
        <List className="w-4 h-4" />
        Timeline View
      </Button>
      <Button
        variant={view === 'calendar' ? 'default' : 'outline'}
        onClick={() => onViewChange('calendar')}
        className="flex items-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Calendar View
      </Button>
    </div>
  );
};
