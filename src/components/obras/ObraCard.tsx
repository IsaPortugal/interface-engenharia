
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Obra } from '@/types/obras';

interface ObraCardProps {
  obra: Obra;
  onViewDetails: (id: number) => void;
}

const ObraCard = ({ obra, onViewDetails }: ObraCardProps) => {
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
          <div className="flex items-center justify-between text-sm">
            <span>Progresso:</span>
            <span>{obra.progresso}%</span>
          </div>
          <Progress value={obra.progresso} className="h-2" />
          
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
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs">{obra.responsavel}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">Responsável</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => onViewDetails(obra.id)}>Detalhes</Button>
      </CardFooter>
    </Card>
  );
};

export default ObraCard;
