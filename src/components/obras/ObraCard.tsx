
import React from 'react';
import { Calendar, Eye, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Obra } from '@/types/obras';

interface ObraCardProps {
  obra: Obra;
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ObraCard: React.FC<ObraCardProps> = ({ obra, onViewDetails, onEdit, onDelete }) => {
  const statusColors = {
    'Em andamento': 'bg-blue-100 text-blue-800',
    'Concluído': 'bg-green-100 text-green-800',
    'Em planejamento': 'bg-gray-100 text-gray-800',
    'Paralisada': 'bg-red-100 text-red-800',
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{obra.nome}</CardTitle>
            <CardDescription className="text-sm">{obra.endereco}</CardDescription>
          </div>
          <Badge className={statusColors[obra.status]}>
            {obra.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Início: {obra.inicio}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button size="sm" variant="outline" onClick={() => onViewDetails(obra.id)}>
          <Eye className="mr-1 h-4 w-4" />
          Visualizar
        </Button>
        <Button size="sm" variant="outline" onClick={() => onEdit(obra.id)}>
          <Pencil className="mr-1 h-4 w-4" />
          Editar
        </Button>
        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => onDelete(obra.id)}>
          <Trash2 className="mr-1 h-4 w-4" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ObraCard;
