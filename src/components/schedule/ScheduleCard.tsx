
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
      <CardContent className="p-5 flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-gray-500 mb-2">{event.project}</p>
        <p className="text-gray-600 mb-3">Data: {event.date}</p>
        <p className="text-gray-600 mb-1 line-clamp-2">{event.description}</p>
        <p className="mt-3 font-medium">Status: {event.status === 'pendente' ? 'Pendente' : 'Resolvido'}</p>
      </CardContent>
      
      <CardFooter className="px-5 py-4 border-t flex justify-between gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={() => onView(event)}>
          Detalhes
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
          Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(event)} 
          className="text-red-500"
        >
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleCard;
