
import React from 'react';
import ReportActivities from './ReportActivities';
import ReportGallery from './ReportGallery';
import ReportIncidents from './ReportIncidents';
import ReportSchedule from './ReportSchedule';
import { scheduleData } from '@/data/scheduleData';

interface ReportContentProps {
  report: any;
  onRemoveIncident?: (incidentId: number) => void;
}

const ReportContent: React.FC<ReportContentProps> = ({ report, onRemoveIncident }) => {
  // Use actual image details if available or fallback to mock images
  const reportImages = report.imageDetails || [
    { caption: 'Avanço da estrutura', fileName: '/placeholder.svg' },
    { caption: 'Fundações concluídas', fileName: '/placeholder.svg' },
    { caption: 'Vista geral da obra', fileName: '/placeholder.svg' }
  ];

  // Filter schedules related to the project if it's a monthly report
  const relatedSchedules = report.type === 'Mensal' ? 
    scheduleData.filter(event => event.project === report.project) : 
    [];

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Conteúdo do Relatório</h3>
      <div className="space-y-4">
        <ReportActivities
          activitiesPerformed={report.activitiesPerformed}
          weatherConditions={report.weatherConditions}
          nextSteps={report.nextSteps}
        />
        
        <ReportGallery images={reportImages} />
        
        <ReportIncidents 
          incidents={report.incidents} 
          onRemoveIncident={onRemoveIncident}
        />

        {report.type === 'Mensal' && relatedSchedules.length > 0 && (
          <ReportSchedule schedules={relatedSchedules} />
        )}
      </div>
    </div>
  );
};

export default ReportContent;
