
import React from 'react';

interface ReportActivitiesProps {
  activitiesPerformed?: string;
  weatherConditions?: string;
  nextSteps?: string;
}

const ReportActivities: React.FC<ReportActivitiesProps> = ({ 
  activitiesPerformed, 
  weatherConditions,
  nextSteps 
}) => {
  return (
    <>
      {activitiesPerformed && (
        <section className="border-l-4 border-[#1976D2] p-4 mb-4">
          <h4 className="text-[#f97316] font-medium mb-2 pb-2 border-b">Atividades Realizadas</h4>
          <p>{activitiesPerformed}</p>
        </section>
      )}
      
      {weatherConditions && (
        <section className="border-l-4 border-[#1976D2] p-4 mb-4">
          <h4 className="text-[#f97316] font-medium mb-2 pb-2 border-b">Condições Climáticas</h4>
          <p>{weatherConditions}</p>
        </section>
      )}
      
      {nextSteps && (
        <section className="border-l-4 border-[#1976D2] p-4 mb-4">
          <h4 className="text-[#f97316] font-medium mb-2 pb-2 border-b">Próximas Etapas</h4>
          <p>{nextSteps}</p>
        </section>
      )}
    </>
  );
};

export default ReportActivities;
