
import React from 'react';
import ObraCard from './ObraCard';
import EmptyObras from './EmptyObras';
import { Obra } from '@/types/obras';

interface ObrasTabContentProps {
  obras: Obra[];
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ObrasTabContent = ({ obras, onViewDetails, onEdit, onDelete }: ObrasTabContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {obras.length > 0 ? (
        obras.map(obra => (
          <ObraCard 
            key={obra.id} 
            obra={obra} 
            onViewDetails={onViewDetails} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <EmptyObras />
      )}
    </div>
  );
};

export default ObrasTabContent;
