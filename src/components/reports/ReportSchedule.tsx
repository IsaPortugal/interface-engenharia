
import React from 'react';
import { Calendar } from 'lucide-react';
import { ScheduleEvent } from '@/data/scheduleData';

interface ReportScheduleProps {
  schedules: ScheduleEvent[];
}

const ReportSchedule: React.FC<ReportScheduleProps> = ({ schedules }) => {
  if (!schedules || schedules.length === 0) return null;
  
  return (
    <section className="bg-[#1976D2] p-4 mb-4 text-black">
      <h4 className="text-[#f97316] font-medium mb-4 pb-2 border-b">
        Agendamentos Relacionados
      </h4>
      <div className="space-y-3">
        {schedules.map((schedule, idx) => (
          <div key={idx} className="border rounded-md p-3 bg-white">
            <div className="font-medium">
              {schedule.title}
            </div>
            <div className="text-sm mt-1 text-gray-600">
              <span>Data: {schedule.date}</span>
              <span className="mx-2">•</span>
              <span>Horário: {schedule.time}</span>
            </div>
            <p className="text-sm mt-1">Local: {schedule.location}</p>
            <p className="text-sm mt-1">Tipo: {schedule.type}</p>
            <p className="text-sm mt-1">Responsável: {schedule.responsible}</p>
            <p className="text-sm mt-1">Status: {schedule.status}</p>
            <p className="text-sm mt-2">{schedule.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportSchedule;
