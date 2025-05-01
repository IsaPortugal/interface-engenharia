
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ScheduleEvent {
  id: number;
  title: string;
  project: string;
  date: string;
  time: string;
  location: string;
  type: string;
  participants: string[];
  description: string;
}

interface ScheduleCardProps {
  event: ScheduleEvent;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ event }) => {
  const date = new Date(event.date);
  const formattedDate = format(date, 'dd MMM', { locale: ptBR });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{event.title}</CardTitle>
            <CardDescription>{event.project}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{formattedDate}</span>
            <span className="mx-2">|</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex -space-x-2">
              {event.participants.map((participant, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs">{participant}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {event.type}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button size="sm" variant="outline" className="w-full">Ver detalhes</Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleCard;
