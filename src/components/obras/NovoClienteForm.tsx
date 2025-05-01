
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Cliente } from '@/types/obras';
import ClienteFormFields from '@/components/clientes/form/ClienteFormFields';
import ClienteContactFields from '@/components/clientes/form/ClienteContactFields';
import { clienteFormSchema, ClienteFormValues, getDefaultClienteValues } from '@/components/clientes/form/ClienteSchema';

interface NovoClienteFormProps {
  initialData?: Cliente;
  onClose: () => void;
  onSave: (data: ClienteFormValues) => void;
  isEdit?: boolean;
}

const NovoClienteForm = ({ initialData, onClose, onSave, isEdit = false }: NovoClienteFormProps) => {
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: initialData || getDefaultClienteValues(),
  });

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
          <ClienteFormFields />
          <ClienteContactFields />

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
