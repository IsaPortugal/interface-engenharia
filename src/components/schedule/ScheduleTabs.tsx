
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon } from 'lucide-react';
import ScheduleCard from './ScheduleCard';

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

interface ScheduleTabsProps {
  filteredEvents: ScheduleEvent[];
}

const ScheduleTabs: React.FC<ScheduleTabsProps> = ({ filteredEvents }) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="visits">Visitas</TabsTrigger>
        <TabsTrigger value="meetings">Reuniões</TabsTrigger>
        <TabsTrigger value="inspections">Inspeções</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <ScheduleCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
              <h3 className="font-medium text-lg">Nenhum agendamento encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar sua busca ou crie um novo agendamento.
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="visits">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents
            .filter(event => event.type === 'Visita')
            .map(event => (
              <ScheduleCard key={event.id} event={event} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="meetings">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents
            .filter(event => event.type === 'Reunião')
            .map(event => (
              <ScheduleCard key={event.id} event={event} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="inspections">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents
            .filter(event => event.type === 'Inspeção')
            .map(event => (
              <ScheduleCard key={event.id} event={event} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ScheduleTabs;
