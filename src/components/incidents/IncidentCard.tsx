
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const IncidentCard = ({ incident, onView, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-2">{incident.title}</h3>
        <p className="text-gray-500 mb-2">{incident.project}</p>
        <p className="text-gray-600 mb-3">Data: {incident.date}</p>
        <p className="text-gray-600 mb-1 line-clamp-2">{incident.description}</p>
        <p className="mt-3 font-medium">
          Status: {incident.status}
        </p>
      </CardContent>
      
      <CardFooter className="px-5 py-4 border-t">
        <div className="card-footer-buttons">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onView(incident)}
          >
            Detalhes
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(incident)}
          >
            Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDelete(incident)}
            className="text-red-500"
          >
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default IncidentCard;
