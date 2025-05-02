
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Obra } from '@/types/obras';

interface ObraCardProps {
  obra: Obra;
  onViewDetails: (obra: Obra) => void;
  onEdit: (obra: Obra) => void;
  onDelete: (obra: Obra) => void;
}

const ObraCard: React.FC<ObraCardProps> = ({ obra, onViewDetails, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div 
        className="h-32 bg-gray-100 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${obra.imagem || '/placeholder.svg'})` }}
      />
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{obra.nome}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-1">{obra.endereco}</p>
        
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <div>
            <p className="font-medium">Início:</p>
            <p>{obra.inicio}</p>
          </div>
          <div>
            <p className="font-medium">Prazo:</p>
            <p>{obra.prazo}</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mt-3">
          {obra.status}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(obra)}>
          Detalhes
        </Button>
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(obra)}>
            Editar
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(obra)} className="text-red-500 hover:text-red-600">
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ObraCard;
