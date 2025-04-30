
import { z } from 'zod';

// Schema de validação para o formulário
export const novaObraFormSchema = z.object({
  // Cliente
  clienteId: z.number().optional(),
  nomeCliente: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  tipoCliente: z.enum(['pf', 'pj'], { required_error: 'Tipo de cliente é obrigatório' }),
  documento: z.string().min(1, { message: 'Documento é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  telefone: z.string().min(10, { message: 'Telefone deve ter pelo menos 10 dígitos' }),
  
  // Obra
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  endereco: z.string().min(5, { message: 'Endereço deve ter pelo menos 5 caracteres' }),
  inicio: z.string().min(1, { message: 'Data de início é obrigatória' }),
  prazo: z.string().min(1, { message: 'Data estimada de término é obrigatória' }),
  responsavel: z.string().min(1, { message: 'Responsável é obrigatório' }),
  tipo: z.string().min(1, { message: 'Tipo de obra é obrigatório' }),
  status: z.string().optional(),
});

export type NovaObraFormValues = z.infer<typeof novaObraFormSchema>;

export const getDefaultFormValues = () => ({
  clienteId: undefined,
  nomeCliente: '',
  tipoCliente: 'pj' as const,
  documento: '',
  email: '',
  telefone: '',
  nome: '',
  endereco: '',
  inicio: new Date().toISOString().split('T')[0],
  prazo: '',
  responsavel: '',
  tipo: '',
  status: 'Em andamento',
});
