
import React from 'react';
import { HardHat } from 'lucide-react';

const EmptyObras = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <HardHat className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
      <h3 className="font-medium text-lg">Nenhuma obra encontrada</h3>
      <p className="text-muted-foreground">
        Tente ajustar sua busca ou cadastre uma nova obra.
      </p>
    </div>
  );
};

export default EmptyObras;
