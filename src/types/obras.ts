
export interface Obra {
  id: number;
  nome: string;
  endereco: string;
  responsavel: string;
  inicio: string;
  prazo: string;
  tipo: string;
  progresso: number;
  status: string;
  imagem: string;
  cliente: number;
  previsaoTermino: string;
  observacoes?: string;
}

export interface Cliente {
  id: number;
  nome: string;
  tipo: 'pf' | 'pj';
  documento: string;
  email: string;
  telefone: string;
  endereco?: string;
  telefone2?: string;
}

export interface ImagemProgress {
  url: string;
  legenda: string;
  data: string;
}
