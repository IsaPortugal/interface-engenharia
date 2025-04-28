
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Cliente, Obra } from '@/types/obras';

// Schema de validação para o formulário
const obraFormSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  cliente: z.string().min(1, { message: 'Selecione um cliente ou cadastre um novo' }),
  endereco: z.string().min(5, { message: 'Endereço deve ter pelo menos 5 caracteres' }),
  inicio: z.string().min(1, { message: 'Data de início é obrigatória' }),
  prazo: z.string().min(1, { message: 'Prazo é obrigatório' }),
  responsavel: z.string().min(1, { message: 'Responsável é obrigatório' }),
  tipo: z.string().min(1, { message: 'Tipo de obra é obrigatório' }),
});

type ObraFormValues = z.infer<typeof obraFormSchema>;

interface NovaObraFormProps {
  clientes: Cliente[];
  onClose: () => void;
  onSave: (data: Omit<Obra, 'id'>) => void;
  onNovoCliente: () => void;
}

const NovaObraForm = ({ clientes, onClose, onSave, onNovoCliente }: NovaObraFormProps) => {
  const form = useForm<ObraFormValues>({
    resolver: zodResolver(obraFormSchema),
    defaultValues: {
      nome: '',
      cliente: '',
      endereco: '',
      inicio: new Date().toISOString().split('T')[0],
      prazo: '',
      responsavel: '',
      tipo: 'Residencial',
    },
  });

  const handleSubmit = (data: ObraFormValues) => {
    onSave({
      nome: data.nome,
      cliente: parseInt(data.cliente), // Convert string to number for cliente ID
      endereco: data.endereco,
      inicio: data.inicio,
      prazo: data.prazo,
      responsavel: data.responsavel,
      tipo: data.tipo,
      progresso: 0,
      status: 'Em andamento',
      imagem: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Nova Obra</DialogTitle>
        <DialogDescription>Preencha os dados para cadastrar uma nova obra.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
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

          <div className="flex gap-2 items-end">
            <FormField
              control={form.control}
              name="cliente"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Cliente</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id.toString()}>
                          {cliente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="outline" onClick={onNovoCliente}>
              Novo Cliente
            </Button>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Obra</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Residencial">Residencial</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                      <SelectItem value="Saúde">Saúde</SelectItem>
                      <SelectItem value="Educacional">Educacional</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

export default NovaObraForm;
