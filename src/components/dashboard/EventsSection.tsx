
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import UpcomingEventCard from './UpcomingEventCard';

interface EventsSectionProps {
  events: Array<{
    title: string;
    date: string;
    time: string;
    type: string;
    users?: string[];
  }>;
  onViewSchedule?: () => void;
}

const EventsSection = ({ events, onViewSchedule }: EventsSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Próximos Eventos</h2>
        <Button variant="outline" className="text-sm" onClick={onViewSchedule}>
          Ver agenda
        </Button>
      </div>
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Agenda</CardTitle>
          <CardDescription>Próximas atividades e agendamentos</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <ul className="space-y-3">
            {events.map((event, index) => (
              <li key={index}>
                <UpcomingEventCard {...event} />
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="pt-0 pb-4 px-4">
          <Button className="w-full" variant="outline" onClick={onViewSchedule}>
            <Calendar className="mr-2 h-4 w-4" />
            Criar novo evento
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventsSection;
