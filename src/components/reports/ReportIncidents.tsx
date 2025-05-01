
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Incident {
  title: string;
  status: string;
  date: string;
  description: string;
}

interface ReportIncidentsProps {
  incidents?: Incident[];
}

const ReportIncidents: React.FC<ReportIncidentsProps> = ({ incidents }) => {
  if (!incidents || incidents.length === 0) return null;
  
  return (
    <section>
      <h4 className="text-base font-medium mb-2 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-1 text-amber-500" />
        Incidentes Registrados
      </h4>
      <div className="space-y-3">
        {incidents.map((incident, idx) => (
          <div key={idx} className="border rounded-md p-3 bg-amber-50">
            <div className="font-medium">
              {incident.title}
            </div>
            <p className="text-sm mt-1 text-gray-600">Data: {incident.date}</p>
            <p className="text-sm mt-1 text-gray-600">Status: {incident.status}</p>
            <p className="text-sm mt-2">{incident.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportIncidents;
