
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';

interface ScheduleEvent {
  id: number;
  title: string;
  project: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  responsible: string;
  status: string;
}

interface ScheduleCardProps {
  event: ScheduleEvent;
  onView: (event: ScheduleEvent) => void;
  onEdit: (event: ScheduleEvent) => void;
  onDelete: (event: ScheduleEvent) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ event, onView, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{event.title}</CardTitle>
            <div className="text-sm text-muted-foreground">{event.project}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
            <span className="mx-2">|</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Tipo: {event.type}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onView(event)}
        >
          Detalhes
        </Button>
        <div className="space-x-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit(event)}
          >
            Editar
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(event)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ScheduleCard;
