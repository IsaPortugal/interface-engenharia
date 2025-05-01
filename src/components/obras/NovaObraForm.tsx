
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Obra, Cliente } from '@/types/obras';
import ObraFormFields from './form/ObraFormFields';
import ClienteSelector from './form/ClienteSelector';
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
        clienteId: String(cliente.id),
        nome: obra.nome,
        endereco: obra.endereco,
        numero: obra?.numero || '',
        complemento: obra?.complemento || '',
        cidade: obra?.cidade || '',
        estado: obra?.estado || '',
        cep: obra?.cep || '',
        inicio: obra.inicio,
        prazo: obra.prazo,
        responsavel: obra.responsavel,
        tipo: obra.tipo,
        status: obra.status,
      });
    }
  }, [form, isEdit, obra, cliente]);

  const handleSubmit = (data: NovaObraFormValues) => {
    if (!data.clienteId) {
      return; // Não permite salvar sem selecionar um cliente
    }
    
    // Criar dados da obra
    const obraData: Omit<Obra, 'id'> = {
      nome: data.nome,
      endereco: data.endereco,
      numero: data.numero,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      inicio: data.inicio,
      prazo: data.prazo,
      responsavel: data.responsavel,
      tipo: data.tipo,
      progresso: obra ? obra.progresso : 0,
      status: isEdit && data.status ? data.status : (obra ? obra.status : 'Em andamento'),
      imagem: obra ? obra.imagem : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
      cliente: parseInt(data.clienteId),
      previsaoTermino: data.prazo,
      observacoes: obra?.observacoes,
    };

    // Usar o cliente existente
    const selectedCliente = clientes.find(c => c.id === parseInt(data.clienteId));
    if (!selectedCliente) return;

    // Cliente já existe, apenas passa os dados dele
    const clienteData: Omit<Cliente, 'id'> = {
      nome: selectedCliente.nome,
      tipo: selectedCliente.tipo,
      documento: selectedCliente.documento,
      email: selectedCliente.email,
      telefone: selectedCliente.telefone,
      endereco: selectedCliente.endereco,
      telefone2: selectedCliente.telefone2,
    };

    onSave(obraData, clienteData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Editar Obra' : 'Nova Obra'}</DialogTitle>
        <DialogDescription>
          {isEdit 
            ? 'Atualize os dados da obra.'
            : 'Preencha os dados para cadastrar uma nova obra.'}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
          {/* Seleção de Cliente */}
          <ClienteSelector clientes={clientes} />
          
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
