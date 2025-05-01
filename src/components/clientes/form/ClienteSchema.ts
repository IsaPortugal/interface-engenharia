
import { z } from 'zod';

export const clienteFormSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  tipo: z.enum(['pf', 'pj'], { required_error: 'Tipo de cliente é obrigatório' }),
  documento: z.string().min(1, { message: 'Documento é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  telefone: z.string().min(10, { message: 'Telefone deve ter pelo menos 10 dígitos' }),
  endereco: z.string().min(5, { message: 'Endereço é obrigatório' }),
  telefone2: z.string().optional(),
});

export type ClienteFormValues = z.infer<typeof clienteFormSchema>;

export const getDefaultClienteValues = () => ({
  nome: '',
  tipo: 'pj' as const,
  documento: '',
  email: '',
  telefone: '',
  endereco: '',
  telefone2: '',
});
