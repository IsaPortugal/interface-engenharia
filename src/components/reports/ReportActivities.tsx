
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
        <section>
          <h4 className="text-base font-medium mb-2">Atividades Realizadas</h4>
          <p>{activitiesPerformed}</p>
        </section>
      )}
      
      {weatherConditions && (
        <section>
          <h4 className="text-base font-medium mb-2">Condições Climáticas</h4>
          <p>{weatherConditions}</p>
        </section>
      )}
      
      {nextSteps && (
        <section>
          <h4 className="text-base font-medium mb-2">Próximas Etapas</h4>
          <p>{nextSteps}</p>
        </section>
      )}
    </>
  );
};

export default ReportActivities;
