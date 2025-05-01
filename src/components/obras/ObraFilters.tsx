
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ObraFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ObraFilters = ({ searchTerm, setSearchTerm }: ObraFiltersProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar obras por nome ou endereço..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ObraFilters;
