
import React from 'react';
import { MapPin, Eye, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Obra } from '@/types/obras';

interface ObraCardProps {
  obra: Obra;
  onViewDetails: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ObraCard = ({ obra, onViewDetails, onEdit, onDelete }: ObraCardProps) => {
  const statusColors = {
    'Em andamento': 'bg-blue-100 text-blue-800',
    'Concluído': 'bg-green-100 text-green-800',
    'Atrasado': 'bg-red-100 text-red-800',
    'Paralisado': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={obra.imagem} 
          alt={obra.nome}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Properly type the event target to access the src property
            const imgElement = e.target as HTMLImageElement;
            // Fallback para imagem padrão em caso de erro
            imgElement.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <Badge className={statusColors[obra.status as keyof typeof statusColors]}>{obra.status}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{obra.nome}</CardTitle>
        <CardDescription className="flex items-center text-xs">
          <MapPin className="h-3 w-3 mr-1" /> {obra.endereco}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <p className="font-semibold">Início:</p>
              <p>{obra.inicio}</p>
            </div>
            <div>
              <p className="font-semibold">Prazo:</p>
              <p>{obra.prazo}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <div className="flex gap-1">
          <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => onViewDetails(obra.id)}>
            <Eye className="h-4 w-4" />
          </Button>
          {onEdit && (
            <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => onEdit(obra.id)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 hover:text-red-600" onClick={() => onDelete(obra.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ObraCard;
