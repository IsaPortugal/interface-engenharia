
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <Card className="h-full flex flex-col">
      <CardContent className="p-5 flex-1">
        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
        <p className="text-gray-500 mb-2">{event.project}</p>
        <div className="space-y-2 mb-4">
          <p className="text-gray-600">Data: {event.date}</p>
          <p className="text-gray-600">Hora: {event.time}</p>
          <p className="text-gray-600">Local: {event.location}</p>
        </div>
        <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
        <p className="font-medium">Status: {event.status === 'pendente' ? 'Pendente' : 'Resolvido'}</p>
      </CardContent>
      
      <CardFooter className="px-5 py-4 border-t flex justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => onView(event)} className="flex-1 no-hover">
          Detalhes
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(event)} className="flex-1 no-hover">
          Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(event)} 
          className="flex-1 text-red-500 no-hover"
        >
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleCard;
