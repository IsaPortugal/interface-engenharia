
import { z } from 'zod';

export const novaObraFormSchema = z.object({
  clienteId: z.string().optional(),
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  endereco: z.string().min(3, { message: 'Endereço é obrigatório' }),
  numero: z.string().min(1, { message: 'Número é obrigatório' }).optional(),
  complemento: z.string().optional(),
  cidade: z.string().min(2, { message: 'Cidade é obrigatória' }).optional(),
  estado: z.string().min(2, { message: 'Estado é obrigatório' }).optional(),
  cep: z.string().min(8, { message: 'CEP deve ter pelo menos 8 caracteres' }).optional(),
  inicio: z.string().min(1, { message: 'Data de início é obrigatória' }),
  prazo: z.string().min(1, { message: 'Prazo é obrigatório' }),
  responsavel: z.string().min(3, { message: 'Responsável é obrigatório' }),
  tipo: z.string().min(3, { message: 'Tipo de obra é obrigatório' }),
  status: z.string().optional(),
});

export type NovaObraFormValues = z.infer<typeof novaObraFormSchema>;

export const getDefaultFormValues = () => ({
  clienteId: '',
  nome: '',
  endereco: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  inicio: '',
  prazo: '',
  responsavel: '',
  tipo: '',
  status: 'Em andamento'
});
