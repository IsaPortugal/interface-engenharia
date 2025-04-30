
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cliente } from '@/types/obras';
import { Search } from 'lucide-react';

interface ClienteFormFieldsProps {
  clientes?: Cliente[];
}

const ClienteFormFields = ({ clientes = [] }: ClienteFormFieldsProps) => {
  const form = useFormContext();
  const [clienteMode, setClienteMode] = useState<'new' | 'existing'>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>(clientes);
  
  // Filtra clientes baseado no termo de busca
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredClientes(clientes);
      return;
    }
    const term = searchTerm.toLowerCase().trim();
    const filtered = clientes.filter(c => 
      c.nome.toLowerCase().includes(term) || 
      c.documento.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
    setFilteredClientes(filtered);
  };

  // Quando seleciona um cliente existente
  const handleClienteSelect = (clienteId: string) => {
    const selectedCliente = clientes.find(c => c.id === parseInt(clienteId));
    if (selectedCliente) {
      form.setValue('clienteId', selectedCliente.id);
      form.setValue('nomeCliente', selectedCliente.nome);
      form.setValue('tipoCliente', selectedCliente.tipo);
      form.setValue('documento', selectedCliente.documento);
      form.setValue('email', selectedCliente.email);
      form.setValue('telefone', selectedCliente.telefone);
    }
  };

  return (
    <div className="space-y-4 border-b pb-4">
      <h3 className="text-lg font-medium">Dados do Cliente</h3>
      
      {/* Opção para escolher entre novo cliente ou existente */}
      <div className="flex gap-4 mb-4">
        <Button 
          type="button"
          variant={clienteMode === 'new' ? 'default' : 'outline'} 
          onClick={() => setClienteMode('new')}
        >
          Novo Cliente
        </Button>
        <Button 
          type="button"
          variant={clienteMode === 'existing' ? 'default' : 'outline'} 
          onClick={() => setClienteMode('existing')}
        >
          Cliente Existente
        </Button>
      </div>

      {/* Campo para cliente existente */}
      {clienteMode === 'existing' && clientes.length > 0 ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Buscar por nome, documento ou email" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="button" onClick={handleSearch} variant="secondary">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <FormField
            control={form.control}
            name="clienteId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecionar Cliente</FormLabel>
                <Select onValueChange={handleClienteSelect} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredClientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id.toString()}>
                        {cliente.nome} - {cliente.tipo === 'pj' ? 'CNPJ' : 'CPF'}: {cliente.documento}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : clienteMode === 'new' ? (
        <>
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
        </>
      ) : (
        <p className="text-muted-foreground">Nenhum cliente cadastrado. Cadastre um novo cliente.</p>
      )}
    </div>
  );
};

export default ClienteFormFields;
