
import React from 'react';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const IncidentCard = ({ incident, onView, onEdit, onDelete }) => {
  // Parse the date string using date-fns parse function
  // Format is "DD/MM/YYYY"
  const parsedDate = parse(incident.date, 'dd/MM/yyyy', new Date());
  const formattedDate = format(parsedDate, 'dd MMM yyyy', { locale: ptBR });

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{incident.title}</CardTitle>
            <div className="text-sm text-muted-foreground">{incident.project}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDate}</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{incident.description}</p>
        <div className="mt-3">
          <span className="text-sm font-medium">
            Status: {incident.status}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onView(incident)}
        >
          Detalhes
        </Button>
        <div className="space-x-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit(incident)}
          >
            Editar
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(incident)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default IncidentCard;
