
import React from 'react';
import { Label } from '@/components/ui/label';

interface RelatedIncidentsProps {
  projectIncidents: any[];
}

const RelatedIncidents: React.FC<RelatedIncidentsProps> = ({ projectIncidents }) => {
  if (projectIncidents.length === 0) return null;
  
  return (
    <div className="grid gap-2">
      <Label>Incidentes Relacionados</Label>
      <div className="border rounded-md p-4 bg-muted/30 space-y-3">
        {projectIncidents.map((incident, index) => (
          <div key={index} className="p-3 bg-background border rounded-md">
            <h4 className="font-medium">{incident.title}</h4>
            <div className="flex gap-2 text-sm text-muted-foreground mt-1">
              <span>Data: {incident.date}</span>
              <span>•</span>
              <span>Status: {incident.status}</span>
            </div>
            <p className="text-sm mt-2">{incident.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedIncidents;
