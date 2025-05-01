
import React from 'react';
import { HardHat } from 'lucide-react';

interface EmptyObrasProps {
  status?: string;
}

const EmptyObras: React.FC<EmptyObrasProps> = ({ status = 'em andamento' }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <HardHat className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
      <h3 className="font-medium text-lg">Nenhuma obra encontrada</h3>
      <p className="text-muted-foreground">
        {status ? `Nenhuma obra ${status} encontrada.` : 'Tente ajustar sua busca ou cadastre uma nova obra.'}
      </p>
    </div>
  );
};

export default EmptyObras;
