
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Cliente } from '@/types/obras';

// Schema de validação para o formulário de cliente
const clienteFormSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  tipo: z.enum(['pf', 'pj'], { required_error: 'Tipo de cliente é obrigatório' }),
  documento: z.string().min(1, { message: 'Documento é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  telefone: z.string().min(10, { message: 'Telefone deve ter pelo menos 10 dígitos' }),
  endereco: z.string().min(5, { message: 'Endereço é obrigatório' }),
  telefone2: z.string().optional(),
});

type ClienteFormValues = z.infer<typeof clienteFormSchema>;

interface NovoClienteFormProps {
  initialData?: Cliente;
  onClose: () => void;
  onSave: (data: ClienteFormValues) => void;
  isEdit?: boolean;
}

const NovoClienteForm = ({ initialData, onClose, onSave, isEdit = false }: NovoClienteFormProps) => {
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: initialData || {
      nome: '',
      tipo: 'pj',
      documento: '',
      email: '',
      telefone: '',
      endereco: '',
      telefone2: '',
    },
  });

  const clientType = form.watch('tipo');

  const handleSubmit = (data: ClienteFormValues) => {
    onSave(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
        <DialogDescription>
          {isEdit 
            ? 'Atualize os dados do cliente.'
            : 'Preencha os dados para cadastrar um novo cliente.'}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="nome"
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
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Cliente</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="pj" />
                      </FormControl>
                      <FormLabel className="cursor-pointer">Pessoa Jurídica</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
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
                <FormLabel>{clientType === 'pj' ? 'CNPJ' : 'CPF'}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={clientType === 'pj' ? 'Ex: 00.000.000/0001-00' : 'Ex: 000.000.000-00'}
                    {...field}
                  />
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
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Rua dos Exemplos, 123 - Bairro - Cidade/UF" {...field} />
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
                <FormLabel>E-mail de Contato</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: contato@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: (11) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone Secundário</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: (11) 99999-9999" {...field} />
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

export default NovoClienteForm;
