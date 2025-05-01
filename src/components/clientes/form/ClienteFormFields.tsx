
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ClienteFormFields = () => {
  const form = useFormContext();
  const clientType = form.watch('tipo');

  return (
    <>
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
    </>
  );
};

export default ClienteFormFields;
