
import React from 'react';
import { Tab } from '@headlessui/react';
import ObraCard from './ObraCard';
import { Obra } from '@/types/obras';
import EmptyObras from './EmptyObras';

interface ObrasTabContentProps {
  filteredObras: Obra[];
  concluidas: boolean;
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
  const obras = filteredObras.filter(obra => obra.concluida === concluidas);
  
  return (
    <Tab.Panel>
      {obras.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {obras.map(obra => (
            <ObraCard
              key={obra.id}
              obra={obra}
              onView={() => handleViewObra(obra)}
              onEdit={() => handleEditObra(obra)}
              onDelete={() => handleDeleteObra(obra)}
            />
          ))}
        </div>
      ) : (
        <EmptyObras status={concluidas ? 'concluídas' : 'em andamento'} />
      )}
    </Tab.Panel>
  );
};

export default ObrasTabContent;
