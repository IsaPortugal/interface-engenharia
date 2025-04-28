
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ObraFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ObraFilters = ({ searchTerm, setSearchTerm }: ObraFiltersProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar obras por nome, endereço ou tipo..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button variant="outline" className="gap-2">
        <Filter className="h-4 w-4" /> Filtrar
      </Button>
    </div>
  );
};

export default ObraFilters;
