
export interface ReportData {
  id: number;
  title: string;
  project: string;
  date: string;
  author: string;
  type: string;
  description: string;
  attachments: number;
  progress?: number;
  nextSteps?: string;
  incidents?: any[];
  imageDetails?: {caption: string, fileName: string}[];
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
    attachments: 3,
    progress: 75,
    nextSteps: 'Finalização da estrutura do 5º andar e início das instalações hidráulicas nos andares já concluídos.',
    incidents: [
      {
        title: 'Vazamento hidráulico',
        project: 'Edifício Residencial Aurora',
        status: 'Em aberto',
        severity: 'Alta',
        date: '23/11/2023',
        description: 'Vazamento identificado na tubulação principal do 3º andar.'
      }
    ]
  },
  {
    id: 2,
    title: 'Relatório Semanal - Semana 45',
    project: 'Centro Comercial Vitória',
    date: '2023-11-15',
    author: 'RS',
    type: 'Semanal',
    description: 'Relatório de acompanhamento semanal das atividades executadas no Centro Comercial Vitória.',
    attachments: 2,
    progress: 45,
    nextSteps: 'Continuação da fundação do setor oeste e preparação para concretagem.'
  },
  {
    id: 3,
    title: 'Relatório Semanal - Semana 46',
    project: 'Hospital São Lucas',
    date: '2023-11-05',
    author: 'TC',
    type: 'Semanal',
    description: 'Relatório de acompanhamento semanal das atividades executadas no Hospital São Lucas.',
    attachments: 5,
    progress: 30,
    incidents: [
      {
        title: 'Problema elétrico',
        project: 'Hospital São Lucas',
        status: 'Resolvido',
        severity: 'Média',
        date: '15/11/2023',
        description: 'Curto-circuito no quadro elétrico principal. Resolvido pela equipe técnica.'
      }
    ]
  }
];
