
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ClienteFormFields = () => {
  const form = useFormContext();
  
  return (
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
  );
};

export default ClienteFormFields;
