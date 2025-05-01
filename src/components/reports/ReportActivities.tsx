
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
        <section className="bg-white p-4 mb-4 border rounded-md shadow-sm">
          <h4 className="text-blue-600 font-medium text-lg mb-2 pb-2 border-b">Atividades Realizadas</h4>
          <p className="text-black">{activitiesPerformed}</p>
        </section>
      )}
      
      {weatherConditions && (
        <section className="bg-white p-4 mb-4 border rounded-md shadow-sm">
          <h4 className="text-blue-600 font-medium text-lg mb-2 pb-2 border-b">Condições Climáticas</h4>
          <p className="text-black">{weatherConditions}</p>
        </section>
      )}
      
      {nextSteps && (
        <section className="bg-white p-4 mb-4 border rounded-md shadow-sm">
          <h4 className="text-blue-600 font-medium text-lg mb-2 pb-2 border-b">Próximas Etapas</h4>
          <p className="text-black">{nextSteps}</p>
        </section>
      )}
    </>
  );
};

export default ReportActivities;
