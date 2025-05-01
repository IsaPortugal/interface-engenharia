
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ObraFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
}

const ObraFilters = ({ searchTerm, setSearchTerm, statusFilter = 'todos', setStatusFilter }: ObraFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar obras por nome ou endereço..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {setStatusFilter && (
        <div className="w-full md:w-64">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="Atrasado">Atrasado</SelectItem>
              <SelectItem value="Concluído">Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default ObraFilters;
