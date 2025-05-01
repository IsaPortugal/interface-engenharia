
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Incident {
  title: string;
  status: string;
  date: string;
  description: string;
  id?: number;
}

interface ReportIncidentsProps {
  incidents?: Incident[];
  onRemoveIncident?: (incidentId: number) => void;
}

const ReportIncidents: React.FC<ReportIncidentsProps> = ({ incidents, onRemoveIncident }) => {
  if (!incidents || incidents.length === 0) return null;
  
  return (
    <section className="bg-[#1976D2] p-4 mb-4 text-black">
      <h4 className="text-[#f97316] font-medium mb-4 pb-2 border-b">
        Incidentes Registrados
      </h4>
      <div className="space-y-3">
        {incidents.map((incident, idx) => (
          <div key={idx} className="border rounded-md p-3 relative bg-white">
            <div className="font-medium text-[#f97316]">
              {incident.title}
            </div>
            <p className="text-sm mt-1">Data: {incident.date}</p>
            <p className="text-sm mt-1">Status: {incident.status}</p>
            <p className="text-sm mt-2">{incident.description}</p>
            
            {onRemoveIncident && incident.id && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0"
                onClick={() => onRemoveIncident(incident.id!)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportIncidents;
