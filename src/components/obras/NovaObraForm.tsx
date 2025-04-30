
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Obra, Cliente } from '@/types/obras';
import ClienteFormFields from './form/ClienteFormFields';
import ObraFormFields from './form/ObraFormFields';
import { novaObraFormSchema, NovaObraFormValues, getDefaultFormValues } from './form/obraFormSchema';

interface NovaObraFormProps {
  obra?: Obra;
  cliente?: Cliente;
  clientes?: Cliente[];
  onClose: () => void;
  onSave: (data: Omit<Obra, 'id'>, clienteData: Omit<Cliente, 'id'>) => void;
  isEdit?: boolean;
}

const NovaObraForm = ({ obra, cliente, clientes = [], onClose, onSave, isEdit = false }: NovaObraFormProps) => {
  const form = useForm<NovaObraFormValues>({
    resolver: zodResolver(novaObraFormSchema),
    defaultValues: getDefaultFormValues(),
  });

  // Populate form when editing an existing obra
  useEffect(() => {
    if (isEdit && obra && cliente) {
      form.reset({
        clienteId: cliente.id,
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
        status: obra.status,
      });
    }
  }, [form, isEdit, obra, cliente]);

  const handleSubmit = (data: NovaObraFormValues) => {
    // Verificar se é um cliente existente
    const useExistingCliente = data.clienteId && data.clienteId > 0;
    
    // Criar dados da obra
    const obraData: Omit<Obra, 'id'> = {
      nome: data.nome,
      endereco: data.endereco,
      inicio: data.inicio,
      prazo: data.prazo,
      responsavel: data.responsavel,
      tipo: data.tipo,
      progresso: obra ? obra.progresso : 0,
      status: isEdit && data.status ? data.status : (obra ? obra.status : 'Em andamento'),
      imagem: obra ? obra.imagem : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
      cliente: useExistingCliente ? data.clienteId! : (obra ? obra.cliente : 0), // Será atualizado após o cliente ser criado
      previsaoTermino: data.prazo,
      observacoes: obra?.observacoes,
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
          <ClienteFormFields clientes={clientes} />
          
          {/* Seção de Dados da Obra */}
          <ObraFormFields isEdit={isEdit} />

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
