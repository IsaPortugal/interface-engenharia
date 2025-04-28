
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Schema de validação para o formulário de cliente
const clienteFormSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  tipo: z.enum(['pf', 'pj'], { required_error: 'Tipo de cliente é obrigatório' }),
  documento: z.string().min(1, { message: 'Documento é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  telefone: z.string().min(10, { message: 'Telefone deve ter pelo menos 10 dígitos' }),
});

interface NovoClienteFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const NovoClienteForm = ({ onClose, onSave }: NovoClienteFormProps) => {
  const form = useForm({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      nome: '',
      tipo: 'pj',
      documento: '',
      email: '',
      telefone: '',
    },
  });

  const clientType = form.watch('tipo');

  const handleSubmit = (data: z.infer<typeof clienteFormSchema>) => {
    onSave(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Cliente</DialogTitle>
        <DialogDescription>Preencha os dados para cadastrar um novo cliente.</DialogDescription>
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
                    defaultValue={field.value}
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

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone de Contato</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: (11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default NovoClienteForm;
