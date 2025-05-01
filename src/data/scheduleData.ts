
export interface ScheduleEvent {
  id: number;
  title: string;
  project: string;
  date: string;
  time: string;
  location: string;
  type: string;
  participants: string[];
  description: string;
}

// Dados de exemplo para agendamentos
export const scheduleData: ScheduleEvent[] = [
  {
    id: 1,
    title: 'Visita técnica com engenheiro',
    project: 'Edifício Residencial Aurora',
    date: '2023-11-25',
    time: '09:00 - 11:00',
    location: 'Av. Paulista, 1000, São Paulo',
    type: 'Visita',
    participants: ['EF', 'RS', 'JC'],
    description: 'Visita técnica para acompanhamento do cronograma.'
  },
  {
    id: 2,
    title: 'Reunião com cliente',
    project: 'Centro Comercial Vitória',
    date: '2023-11-27',
    time: '14:30 - 15:30',
    location: 'Escritório VPRO',
    type: 'Reunião',
    participants: ['EF', 'PL'],
    description: 'Apresentação do andamento das obras.'
  },
  {
    id: 3,
    title: 'Vistoria final',
    project: 'Hospital São Lucas',
    date: '2023-11-30',
    time: '10:00 - 12:00',
    location: 'Rua das Flores, 500, Florianópolis',
    type: 'Inspeção',
    participants: ['EF', 'TC', 'MR'],
    description: 'Vistoria final para liberação da fase 1.'
  }
];
