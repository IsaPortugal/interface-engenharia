
export interface ReportData {
  id: number;
  title: string;
  project: string;
  date: string;
  author: string;
  type: string;
  description: string;
  attachments: number;
}

// Reduced to just 3 reports as requested
export const reportsData: ReportData[] = [
  {
    id: 1,
    title: 'Relatório Mensal - Outubro/2023',
    project: 'Edifício Residencial Aurora',
    date: '2023-10-31',
    author: 'EF',
    type: 'Mensal',
    description: 'Relatório de acompanhamento mensal das obras do Edifício Residencial Aurora, incluindo análise de cronograma, custos e qualidade.',
    attachments: 3
  },
  {
    id: 2,
    title: 'Relatório Semanal - Semana 45',
    project: 'Centro Comercial Vitória',
    date: '2023-11-15',
    author: 'RS',
    type: 'Semanal',
    description: 'Relatório de acompanhamento semanal das atividades executadas no Centro Comercial Vitória.',
    attachments: 2
  },
  {
    id: 3,
    title: 'Relatório Semanal - Semana 46',
    project: 'Hospital São Lucas',
    date: '2023-11-05',
    author: 'TC',
    type: 'Semanal',
    description: 'Relatório de acompanhamento semanal das atividades executadas no Hospital São Lucas.',
    attachments: 5
  }
];
