
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ClientesSearchFieldProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ClientesSearchField = ({ searchTerm, onSearchChange }: ClientesSearchFieldProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar clientes por nome, documento, email ou telefone..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ClientesSearchField;
