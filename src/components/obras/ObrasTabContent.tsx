
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ObraCard from './ObraCard';
import { Obra } from '@/types/obras';
import EmptyObras from './EmptyObras';

interface ObrasTabContentProps {
  filteredObras: Obra[];
  statusFilter?: string;
  concluidas?: boolean; // Keeping for backward compatibility
  handleViewObra: (obra: Obra) => void; 
  handleEditObra: (obra: Obra) => void;
  handleDeleteObra: (obra: Obra) => void;
}

const ObrasTabContent: React.FC<ObrasTabContentProps> = ({
  filteredObras,
  statusFilter,
  concluidas,
  handleViewObra,
  handleEditObra,
  handleDeleteObra
}) => {
  // Filter obras based on status
  const obras = filteredObras.filter(obra => {
    if (statusFilter) {
      return obra.status === statusFilter;
    } else if (concluidas !== undefined) {
      return obra.status === (concluidas ? 'Concluído' : 'Em andamento');
    }
    return true;
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {obras.length > 0 ? (
        obras.map(obra => (
          <ObraCard
            key={obra.id}
            obra={obra}
            onViewDetails={handleViewObra}
            onEdit={handleEditObra}
            onDelete={handleDeleteObra}
          />
        ))
      ) : (
        <EmptyObras status={statusFilter || (concluidas ? 'concluídas' : 'em andamento')} />
      )}
    </div>
  );
};

export default ObrasTabContent;
