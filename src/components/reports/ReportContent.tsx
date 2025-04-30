
import React from 'react';
import ReportActivities from './ReportActivities';
import ReportGallery from './ReportGallery';
import ReportIncidents from './ReportIncidents';

interface ReportContentProps {
  report: any;
}

const ReportContent: React.FC<ReportContentProps> = ({ report }) => {
  // Use actual image details if available or fallback to mock images
  const reportImages = report.imageDetails || [
    { caption: 'Avanço da estrutura', fileName: '/placeholder.svg' },
    { caption: 'Fundações concluídas', fileName: '/placeholder.svg' },
    { caption: 'Vista geral da obra', fileName: '/placeholder.svg' }
  ];

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
        
        <ReportIncidents incidents={report.incidents} />
      </div>
    </div>
  );
};

export default ReportContent;
