
import React from 'react';
import { Calendar } from 'lucide-react';
import { ScheduleEvent } from '@/data/scheduleData';

interface ReportScheduleProps {
  schedules: ScheduleEvent[];
}

const ReportSchedule: React.FC<ReportScheduleProps> = ({ schedules }) => {
  if (!schedules || schedules.length === 0) return null;
  
  return (
    <section>
      <h4 className="text-base font-medium mb-2 flex items-center">
        <Calendar className="h-5 w-5 mr-1 text-blue-500" />
        Agendamentos Relacionados
      </h4>
      <div className="space-y-3">
        {schedules.map((schedule, idx) => (
          <div key={idx} className="border rounded-md p-3 bg-blue-50">
            <div className="font-medium">
              {schedule.title}
            </div>
            <div className="text-sm mt-1 text-gray-600">
              <span>Data: {schedule.date}</span>
              <span className="mx-2">•</span>
              <span>Horário: {schedule.time}</span>
            </div>
            <p className="text-sm mt-1 text-gray-600">Local: {schedule.location}</p>
            <p className="text-sm mt-1 text-gray-600">Tipo: {schedule.type}</p>
            <p className="text-sm mt-1 text-gray-600">Responsável: {schedule.responsible}</p>
            <p className="text-sm mt-1 text-gray-600">Status: {schedule.status}</p>
            <p className="text-sm mt-2">{schedule.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportSchedule;
