
import { Obra, Cliente } from '@/types/obras';

// Dados de exemplo para projetos de obra
export const obrasData: Obra[] = [
  {
    id: 1,
    nome: 'Edifício Residencial Aurora',
    endereco: 'Av. Paulista, 1000, São Paulo',
    responsavel: 'EF',
    inicio: '10/01/2023',
    prazo: '15/12/2023',
    tipo: 'Residencial',
    progresso: 75,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 2,
    nome: 'Centro Comercial Vitória',
    endereco: 'Rua das Flores, 500, Florianópolis',
    responsavel: 'RS',
    inicio: '05/03/2023',
    prazo: '25/02/2024',
    tipo: 'Comercial',
    progresso: 45,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 3,
    nome: 'Hospital São Lucas',
    endereco: 'Av. Brasil, 2000, Rio de Janeiro',
    responsavel: 'TC',
    inicio: '20/05/2023',
    prazo: '30/06/2024',
    tipo: 'Saúde',
    progresso: 30,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=2671&auto=format&fit=crop'
  },
  {
    id: 4,
    nome: 'Condomínio Park Avenue',
    endereco: 'Rua João Paulo, 350, Curitiba',
    responsavel: 'MF',
    inicio: '15/07/2022',
    prazo: '10/08/2023',
    tipo: 'Residencial',
    progresso: 100,
    status: 'Concluído',
    imagem: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2670&auto=format&fit=crop'
  }
];

// Dados de exemplo para clientes
export const clientesData: Cliente[] = [
  {
    id: 1,
    nome: 'Construtora ABC Ltda',
    tipo: 'pj',
    documento: '12.345.678/0001-90',
    email: 'contato@construtorabc.com',
    telefone: '(11) 3333-4444'
  },
  {
    id: 2,
    nome: 'Maria Silva',
    tipo: 'pf',
    documento: '123.456.789-00',
    email: 'maria.silva@email.com',
    telefone: '(11) 99999-8888'
  },
  {
    id: 3,
    nome: 'Incorporadora XYZ S.A.',
    tipo: 'pj',
    documento: '98.765.432/0001-10',
    email: 'contato@incorporadoraxyz.com',
    telefone: '(21) 2222-3333'
  }
];
