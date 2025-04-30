
import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Obra, Cliente } from '@/types/obras';

// Schema de validação para o formulário
const novaObraFormSchema = z.object({
  // Cliente
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
});

type NovaObraFormValues = z.infer<typeof novaObraFormSchema>;

interface NovaObraFormProps {
  obra?: Obra;
  cliente?: Cliente;
  onClose: () => void;
  onSave: (data: Omit<Obra, 'id'>, clienteData: Omit<Cliente, 'id'>) => void;
  isEdit?: boolean;
}

const NovaObraForm = ({ obra, cliente, onClose, onSave, isEdit = false }: NovaObraFormProps) => {
  const form = useForm<NovaObraFormValues>({
    resolver: zodResolver(novaObraFormSchema),
    defaultValues: {
      nomeCliente: '',
      tipoCliente: 'pj',
      documento: '',
      email: '',
      telefone: '',
      nome: '',
      endereco: '',
      inicio: new Date().toISOString().split('T')[0],
      prazo: '',
      responsavel: '',
      tipo: '',
    },
  });

  // Populate form when editing an existing obra
  useEffect(() => {
    if (isEdit && obra && cliente) {
      form.reset({
        nomeCliente: cliente.nome,
        tipoCliente: cliente.tipo,
        documento: cliente.documento,
        email: cliente.email,
        telefone: cliente.telefone,
        nome: obra.nome,
        endereco: obra.endereco,
        inicio: obra.inicio,
        prazo: obra.prazo,
        responsavel: obra.responsavel,
        tipo: obra.tipo,
      });
    }
  }, [form, isEdit, obra, cliente]);

  const handleSubmit = (data: NovaObraFormValues) => {
    // Criar dados da obra
    const obraData: Omit<Obra, 'id'> = {
      nome: data.nome,
      endereco: data.endereco,
      inicio: data.inicio,
      prazo: data.prazo,
      responsavel: data.responsavel,
      tipo: data.tipo,
      progresso: obra ? obra.progresso : 0,
      status: obra ? obra.status : 'Em andamento',
      imagem: obra ? obra.imagem : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
      cliente: obra ? obra.cliente : 0, // Será atualizado após o cliente ser criado
      previsaoTermino: data.prazo,
    };

    // Criar dados do cliente
    const clienteData: Omit<Cliente, 'id'> = {
      nome: data.nomeCliente,
      tipo: data.tipoCliente,
      documento: data.documento,
      email: data.email,
      telefone: data.telefone,
    };

    onSave(obraData, clienteData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Editar Obra' : 'Nova Obra'}</DialogTitle>
        <DialogDescription>
          {isEdit 
            ? 'Atualize os dados da obra e do cliente.'
            : 'Preencha os dados para cadastrar uma nova obra e cliente.'}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
          {/* Seção de Dados do Cliente */}
          <div className="space-y-4 border-b pb-4">
            <h3 className="text-lg font-medium">Dados do Cliente</h3>
            
            <FormField
              control={form.control}
              name="nomeCliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Empresa ABC Ltda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoCliente"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de cliente</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pj" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">Pessoa Jurídica</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pf" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">Pessoa Física</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{form.watch('tipoCliente') === 'pj' ? 'CNPJ' : 'CPF'}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={form.watch('tipoCliente') === 'pj' 
                        ? 'Ex: 00.000.000/0001-00' 
                        : 'Ex: 000.000.000-00'} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail de contato</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: contato@empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone de contato</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: (11) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Seção de Dados da Obra */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-medium">Dados da Obra</h3>
            
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Obra</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Edifício Residencial Aurora" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Av. Paulista, 1000, São Paulo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Obra</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Residencial, Comercial, Industrial..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="inicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prazo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Estimada de Término</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="responsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsável pela Obra</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Eng. João Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{isEdit ? 'Atualizar' : 'Salvar'}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default NovaObraForm;
