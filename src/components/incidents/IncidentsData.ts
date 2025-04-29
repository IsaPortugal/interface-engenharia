
export interface Incident {
  id: number;
  title: string;
  project: string;
  status: 'Em aberto' | 'Resolvido';
  severity: string;
  date: string;
  assignedTo: string;
  description: string;
}

export const incidentsData: Incident[] = [
  {
    id: 1,
    title: 'Vazamento hidráulico',
    project: 'Edifício Residencial Aurora',
    status: 'Em aberto',
    severity: 'Alta',
    date: '23/11/2023',
    assignedTo: 'EF',
    description: 'Vazamento identificado na tubulação principal do 3º andar.'
  },
  {
    id: 2,
    title: 'Rachadura estrutural',
    project: 'Centro Comercial Vitória',
    status: 'Resolvido',
    severity: 'Crítica',
    date: '20/11/2023',
    assignedTo: 'RS',
    description: 'Rachadura identificada na parede de sustentação da área oeste. Foi reforçada a estrutura e aplicada massa especial para correção.'
  },
  {
    id: 3,
    title: 'Problema elétrico',
    project: 'Condomínio Park Avenue',
    status: 'Resolvido',
    severity: 'Média',
    date: '15/11/2023',
    assignedTo: 'TC',
    description: 'Curto-circuito no quadro elétrico principal. Resolvido pela equipe técnica.'
  }
];

export const statsData = [
  { title: 'Total Incidentes', value: '3', icon: 'AlertTriangle', color: 'bg-orange-100 text-orange-800' },
  { title: 'Resolvidos', value: '2', icon: 'CheckCircle2', color: 'bg-green-100 text-green-800' },
  { title: 'Pendentes', value: '1', icon: 'Clock', color: 'bg-blue-100 text-blue-800' },
];
