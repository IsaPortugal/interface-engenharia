
import React from 'react';
import { Calendar } from 'lucide-react';
import { ScheduleEvent } from '@/data/scheduleData';

interface ReportScheduleProps {
  schedules: ScheduleEvent[];
}

const ReportSchedule: React.FC<ReportScheduleProps> = ({ schedules }) => {
  if (!schedules || schedules.length === 0) return null;
  
  return (
    <section className="bg-white p-4 mb-4 border rounded-md shadow-sm">
      <h4 className="text-blue-600 font-medium text-lg mb-4 pb-2 border-b">
        Agendamentos Relacionados
      </h4>
      <div className="space-y-3">
        {schedules.map((schedule, idx) => (
          <div key={idx} className="border rounded-md p-3 bg-white">
            <div className="font-medium text-blue-600">
              {schedule.title}
            </div>
            <div className="text-sm mt-1 text-gray-600">
              <span>Data: {schedule.date}</span>
              <span className="mx-2">•</span>
              <span>Horário: {schedule.time}</span>
            </div>
            <p className="text-sm mt-1 text-black">Local: {schedule.location}</p>
            <p className="text-sm mt-1 text-black">Tipo: {schedule.type}</p>
            <p className="text-sm mt-1 text-black">Responsável: {schedule.responsible}</p>
            <p className="text-sm mt-1 text-black">Status: {schedule.status}</p>
            <p className="text-sm mt-2 text-black">{schedule.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportSchedule;
