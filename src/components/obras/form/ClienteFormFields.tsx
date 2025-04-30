
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Cliente } from '@/types/obras';
import { Search } from 'lucide-react';

interface ClienteFormFieldsProps {
  clientes?: Cliente[];
}

const ClienteFormFields = ({ clientes = [] }: ClienteFormFieldsProps) => {
  const form = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Cliente[]>([]);

  // Função para buscar cliente por CPF/CNPJ
  const handleSearchCliente = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Remove formatação para comparar apenas os números
    const cleanSearch = searchTerm.replace(/[^\d]/g, '');
    
    const found = clientes.filter(cliente => {
      const cleanDoc = cliente.documento.replace(/[^\d]/g, '');
      return cleanDoc.includes(cleanSearch);
    });
    
    setSearchResults(found);
  };

  // Seleciona um cliente existente
  const handleSelectCliente = (cliente: Cliente) => {
    form.setValue('clienteId', cliente.id);
    form.setValue('nomeCliente', cliente.nome);
    form.setValue('tipoCliente', cliente.tipo);
    form.setValue('documento', cliente.documento);
    form.setValue('email', cliente.email);
    form.setValue('telefone', cliente.telefone);
    setSearchResults([]);
    setSearchTerm('');
  };

  // Limpa os dados do cliente selecionado
  const handleNewCliente = () => {
    form.setValue('clienteId', undefined);
    form.setValue('nomeCliente', '');
    form.setValue('documento', '');
    form.setValue('email', '');
    form.setValue('telefone', '');
    setSearchResults([]);
    setSearchTerm('');
  };

  return (
    <div className="space-y-4 border-b pb-4">
      <h3 className="text-lg font-medium">Dados do Cliente</h3>
      
      {/* Busca de cliente por CPF/CNPJ */}
      <div className="border p-4 rounded-md bg-muted/30 mb-4">
        <h4 className="text-sm font-medium mb-2">Buscar cliente existente</h4>
        <div className="flex gap-2 mb-2">
          <Input 
            placeholder="Digite CPF ou CNPJ" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="button" onClick={handleSearchCliente} size="sm">
            <Search className="h-4 w-4 mr-2" /> Buscar
          </Button>
        </div>
        
        {/* Resultados da busca */}
        {searchResults.length > 0 && (
          <div className="border rounded-md mt-2 overflow-hidden max-h-[200px] overflow-y-auto bg-background">
            <ul>
              {searchResults.map((cliente) => (
                <li 
                  key={cliente.id} 
                  className="p-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                  onClick={() => handleSelectCliente(cliente)}
                >
                  <div className="font-medium">{cliente.nome}</div>
                  <div className="text-sm text-muted-foreground">
                    {cliente.tipo === 'pj' ? 'CNPJ' : 'CPF'}: {cliente.documento}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {form.watch('clienteId') && (
          <div className="mt-2 text-sm">
            <p>Cliente selecionado: <span className="font-medium">{form.watch('nomeCliente')}</span></p>
            <Button 
              type="button" 
              variant="link" 
              className="p-0 h-auto text-sm" 
              onClick={handleNewCliente}
            >
              Cadastrar novo cliente
            </Button>
          </div>
        )}
      </div>
      
      {/* Formulário de cliente */}
      {!form.watch('clienteId') && (
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
      )}
    </div>
  );
};

export default ClienteFormFields;
