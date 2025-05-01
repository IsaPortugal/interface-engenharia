
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cliente } from '@/types/obras';

interface ClienteSelectorProps {
  clientes: Cliente[];
}

const ClienteSelector = ({ clientes }: ClienteSelectorProps) => {
  const form = useFormContext();

  return (
    <div className="space-y-4 border-b pb-4">
      <h3 className="text-lg font-medium">Selecione o Cliente</h3>
      
      <FormField
        control={form.control}
        name="clienteId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cliente</FormLabel>
            <FormControl>
              <Select 
                onValueChange={(value) => field.onChange(parseInt(value))} 
                value={field.value ? String(field.value) : undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={String(cliente.id)}>
                      {cliente.nome} - {cliente.tipo === 'pj' ? 'CNPJ: ' : 'CPF: '}{cliente.documento}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ClienteSelector;
