
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ObraCard from './ObraCard';
import { Obra } from '@/types/obras';
import EmptyObras from './EmptyObras';

interface ObrasTabContentProps {
  filteredObras: Obra[];
  concluidas?: boolean;
  handleViewObra: (obra: Obra) => void; 
  handleEditObra: (obra: Obra) => void;
  handleDeleteObra: (obra: Obra) => void;
}

const ObrasTabContent: React.FC<ObrasTabContentProps> = ({
  filteredObras,
  concluidas,
  handleViewObra,
  handleEditObra,
  handleDeleteObra
}) => {
  // Filter obras based on status instead of 'concluida' which doesn't exist on the Obra type
  const obras = filteredObras.filter(obra => 
    concluidas !== undefined 
      ? obra.status === (concluidas ? 'Concluído' : 'Em andamento') 
      : true
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {obras.length > 0 ? (
        obras.map(obra => (
          <ObraCard
            key={obra.id}
            obra={obra}
            onViewDetails={() => handleViewObra(obra)}
            onEdit={() => handleEditObra(obra)}
            onDelete={() => handleDeleteObra(obra)}
          />
        ))
      ) : (
        <EmptyObras status={concluidas ? 'concluídas' : 'em andamento'} />
      )}
    </div>
  );
};

export default ObrasTabContent;
