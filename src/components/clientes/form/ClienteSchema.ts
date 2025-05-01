
import { z } from 'zod';

export const clienteFormSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  tipo: z.enum(['pf', 'pj'], { required_error: 'Tipo de cliente é obrigatório' }),
  documento: z.string().min(1, { message: 'Documento é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  telefone: z.string().min(10, { message: 'Telefone deve ter pelo menos 10 dígitos' }),
  endereco: z.string().min(3, { message: 'Endereço é obrigatório' }),
  numero: z.string().min(1, { message: 'Número é obrigatório' }),
  complemento: z.string().optional(),
  cidade: z.string().min(2, { message: 'Cidade é obrigatória' }),
  estado: z.string().min(2, { message: 'Estado é obrigatório' }),
  cep: z.string().min(8, { message: 'CEP deve ter pelo menos 8 caracteres' }),
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
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  telefone2: '',
});
