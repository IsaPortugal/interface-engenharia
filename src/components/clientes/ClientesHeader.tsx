
import React from 'react';
import { User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientesHeaderProps {
  onNovoCliente: () => void;
}

const ClientesHeader = ({ onNovoCliente }: ClientesHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <User className="mr-2 h-6 w-6 text-primary" />
          Clientes
        </h1>
        <p className="text-muted-foreground">Gerencie os clientes cadastrados no sistema</p>
      </div>
      
      <Button onClick={onNovoCliente}>
        <Plus className="mr-2 h-4 w-4" /> 
        Novo Cliente
      </Button>
    </div>
  );
};

export default ClientesHeader;
