
import React, { useState } from 'react';
import { Building, Filter, Calendar, Search, Plus, MapPin, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

// Dados de exemplo para projetos de obra
const obrasData = [
  {
    id: 1,
    nome: 'Edifício Residencial Aurora',
    endereco: 'Av. Paulista, 1000, São Paulo',
    responsavel: 'EF',
    inicio: '10/01/2023',
    prazo: '15/12/2023',
    tipo: 'Residencial',
    progresso: 75,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 2,
    nome: 'Centro Comercial Vitória',
    endereco: 'Rua das Flores, 500, Florianópolis',
    responsavel: 'RS',
    inicio: '05/03/2023',
    prazo: '25/02/2024',
    tipo: 'Comercial',
    progresso: 45,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 3,
    nome: 'Hospital São Lucas',
    endereco: 'Av. Brasil, 2000, Rio de Janeiro',
    responsavel: 'TC',
    inicio: '20/05/2023',
    prazo: '30/06/2024',
    tipo: 'Saúde',
    progresso: 30,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=2671&auto=format&fit=crop'
  },
  {
    id: 4,
    nome: 'Condomínio Park Avenue',
    endereco: 'Rua João Paulo, 350, Curitiba',
    responsavel: 'MF',
    inicio: '15/07/2022',
    prazo: '10/08/2023',
    tipo: 'Residencial',
    progresso: 100,
    status: 'Concluído',
    imagem: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2670&auto=format&fit=crop'
  }
];

// Componente para cartão de obra
const ObraCard = ({ obra }) => {
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
            // Fallback para imagem padrão em caso de erro
            e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <Badge className={statusColors[obra.status]}>{obra.status}</Badge>
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
        <Button size="sm" variant="outline">Detalhes</Button>
      </CardFooter>
    </Card>
  );
};

// Página principal de Obras
const Obras = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar obras com base no termo de busca
  const filteredObras = obrasData.filter(obra => 
    obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Building className="mr-2 h-6 w-6 text-primary" />
            Obras
          </h1>
          <p className="text-muted-foreground">Gerencie e monitore todas as obras em andamento</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> 
          Nova Obra
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar obras por nome, endereço ou tipo..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filtrar
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="ongoing">Em andamento</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredObras.length > 0 ? (
              filteredObras.map(obra => (
                <ObraCard key={obra.id} obra={obra} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <HardHat className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
                <h3 className="font-medium text-lg">Nenhuma obra encontrada</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou cadastre uma nova obra.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ongoing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredObras
              .filter(obra => obra.status === 'Em andamento')
              .map(obra => (
                <ObraCard key={obra.id} obra={obra} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredObras
              .filter(obra => obra.status === 'Concluído')
              .map(obra => (
                <ObraCard key={obra.id} obra={obra} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Obras;
