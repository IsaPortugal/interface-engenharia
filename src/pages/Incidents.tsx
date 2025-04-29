
import React, { useState } from 'react';
import { AlertTriangle, Plus, Calendar, Search, CheckCircle2, Clock, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";

const incidentsData = [
  {
    id: 1,
    title: 'Vazamento hidráulico',
    project: 'Edifício Residencial Aurora',
    status: 'Em aberto',
    severity: 'Alta',
    date: '23/11/2023',
    assignedTo: 'EF',
    description: 'Vazamento identificado na tubulação principal do 3º andar.'
  },
  {
    id: 2,
    title: 'Rachadura estrutural',
    project: 'Centro Comercial Vitória',
    status: 'Resolvido',
    severity: 'Crítica',
    date: '20/11/2023',
    assignedTo: 'RS',
    description: 'Rachadura identificada na parede de sustentação da área oeste. Foi reforçada a estrutura e aplicada massa especial para correção.'
  },
  {
    id: 3,
    title: 'Problema elétrico',
    project: 'Condomínio Park Avenue',
    status: 'Resolvido',
    severity: 'Média',
    date: '15/11/2023',
    assignedTo: 'TC',
    description: 'Curto-circuito no quadro elétrico principal. Resolvido pela equipe técnica.'
  }
];

const IncidentCard = ({ incident }: { incident: any }) => {
  const statusColors = {
    'Em aberto': 'bg-blue-100 text-blue-800',
    'Resolvido': 'bg-green-100 text-green-800'
  };

  const handleViewClick = () => {
    toast.info(`Visualizando incidente: ${incident.title}`);
  };

  const handleEditClick = () => {
    toast.info(`Editando incidente: ${incident.title}`);
  };

  const handleDeleteClick = () => {
    toast.error(`Excluindo incidente: ${incident.title}`);
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{incident.title}</CardTitle>
            <CardDescription className="text-sm">{incident.project}</CardDescription>
          </div>
          <Badge className={statusColors[incident.status as keyof typeof statusColors]}>
            {incident.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-700 mb-4">{incident.description}</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{incident.date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button size="sm" variant="outline" onClick={handleViewClick}>
          <Eye className="mr-1 h-4 w-4" />
          Visualizar
        </Button>
        <Button size="sm" variant="outline" onClick={handleEditClick}>
          <Pencil className="mr-1 h-4 w-4" />
          Editar
        </Button>
        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={handleDeleteClick}>
          <Trash2 className="mr-1 h-4 w-4" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

const IncidentForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <DialogHeader className="text-center">
        <DialogTitle>Registrar Novo Incidente</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Digite o título do incidente" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project">Obra</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a obra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aurora">Edifício Residencial Aurora</SelectItem>
              <SelectItem value="vitoria">Centro Comercial Vitória</SelectItem>
              <SelectItem value="park">Condomínio Park Avenue</SelectItem>
              <SelectItem value="hospital">Hospital São Lucas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="assigned">Responsável</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o responsável" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ef">Eng. Fiscal (EF)</SelectItem>
              <SelectItem value="rs">Roberto Silva (RS)</SelectItem>
              <SelectItem value="tc">Técnico Carlos (TC)</SelectItem>
              <SelectItem value="mf">Maria Fernandes (MF)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="em-aberto">Em aberto</SelectItem>
              <SelectItem value="resolvido">Resolvido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Data</Label>
          <Input id="date" type="date" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" placeholder="Descreva o incidente..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Imagens</Label>
          <Input id="image" type="file" multiple />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
        <Button type="submit">Registrar Incidente</Button>
      </DialogFooter>
    </>
  );
};

const statsData = [
  { title: 'Total Incidentes', value: '3', icon: AlertTriangle, color: 'bg-orange-100 text-orange-800' },
  { title: 'Resolvidos', value: '2', icon: CheckCircle2, color: 'bg-green-100 text-green-800' },
  { title: 'Pendentes', value: '1', icon: Clock, color: 'bg-blue-100 text-blue-800' },
];

const Incidents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredIncidents = incidentsData.filter(incident => 
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container max-w-6xl mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-orange-500" />
            Incidentes
          </h1>
          <p className="text-muted-foreground">Gerencie os incidentes reportados nas obras</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" /> 
              Registrar Incidente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <IncidentForm onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar incidentes por título ou projeto..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="open">Em aberto</TabsTrigger>
          <TabsTrigger value="resolved">Resolvidos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map(incident => (
                <IncidentCard key={incident.id} incident={incident} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
                <h3 className="font-medium text-lg">Nenhum incidente encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou registre um novo incidente.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="open">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIncidents
              .filter(incident => incident.status === 'Em aberto')
              .map(incident => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIncidents
              .filter(incident => incident.status === 'Resolvido')
              .map(incident => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Incidents;
