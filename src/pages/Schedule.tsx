import React, { useState } from 'react';
import { CalendarIcon, Clock, Users, MapPin, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Dados de exemplo para agendamentos
const scheduleData = [
  {
    id: 1,
    title: 'Visita técnica com engenheiro',
    project: 'Edifício Residencial Aurora',
    date: '2023-11-25',
    time: '09:00 - 11:00',
    location: 'Av. Paulista, 1000, São Paulo',
    type: 'Visita',
    participants: ['EF', 'RS', 'JC'],
    description: 'Visita técnica para acompanhamento do cronograma.'
  },
  {
    id: 2,
    title: 'Reunião com cliente',
    project: 'Centro Comercial Vitória',
    date: '2023-11-27',
    time: '14:30 - 15:30',
    location: 'Escritório VPRO',
    type: 'Reunião',
    participants: ['EF', 'PL'],
    description: 'Apresentação do andamento das obras.'
  },
  {
    id: 3,
    title: 'Vistoria final',
    project: 'Hospital São Lucas',
    date: '2023-11-30',
    time: '10:00 - 12:00',
    location: 'Rua das Flores, 500, Florianópolis',
    type: 'Inspeção',
    participants: ['EF', 'TC', 'MR'],
    description: 'Vistoria final para liberação da fase 1.'
  }
];

// Componente para exibir um agendamento
const ScheduleCard = ({ event }) => {
  const typeColors = {
    'Visita': 'bg-green-100 text-green-800',
    'Reunião': 'bg-blue-100 text-blue-800',
    'Inspeção': 'bg-orange-100 text-orange-800',
    'Entrega': 'bg-purple-100 text-purple-800'
  };

  const date = new Date(event.date);
  const formattedDate = format(date, 'dd MMM', { locale: ptBR });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{event.title}</CardTitle>
            <CardDescription>{event.project}</CardDescription>
          </div>
          <Badge className={typeColors[event.type]}>
            {event.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{formattedDate}</span>
            <span className="mx-2">|</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex -space-x-2">
              {event.participants.map((participant, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs">{participant}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button size="sm" variant="outline" className="w-full">Ver detalhes</Button>
      </CardFooter>
    </Card>
  );
};

// Formulário para criar/editar agendamentos
const ScheduleForm = ({ onClose }) => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <DialogHeader>
        <DialogTitle>Agendar Novo Compromisso</DialogTitle>
        <DialogDescription>
          Preencha os detalhes do agendamento.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Ex: Visita técnica" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="time">Horário</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0900">09:00 - 10:00</SelectItem>
                <SelectItem value="1000">10:00 - 11:00</SelectItem>
                <SelectItem value="1100">11:00 - 12:00</SelectItem>
                <SelectItem value="1300">13:00 - 14:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="project">Projeto</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o projeto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aurora">Edifício Residencial Aurora</SelectItem>
              <SelectItem value="vitoria">Centro Comercial Vitória</SelectItem>
              <SelectItem value="park">Condomínio Park Avenue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="type">Tipo</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visita">Visita</SelectItem>
              <SelectItem value="reuniao">Reunião</SelectItem>
              <SelectItem value="inspecao">Inspeção</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">Local</Label>
          <Input id="location" placeholder="Endereço ou nome do local" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" placeholder="Descreva o objetivo deste agendamento..." />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
        <Button type="submit">Agendar</Button>
      </DialogFooter>
    </>
  );
};

// Página de Agendamentos
const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filtragem de agendamentos
  const filteredEvents = scheduleData.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            <CalendarIcon className="inline mr-2 h-6 w-6 text-blue-500" />
            Agendamentos
          </h1>
          <p className="text-muted-foreground">Gerencie seus compromissos relacionados às obras</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <ScheduleForm onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar agendamentos..."
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
          <TabsTrigger value="visits">Visitas</TabsTrigger>
          <TabsTrigger value="meetings">Reuniões</TabsTrigger>
          <TabsTrigger value="inspections">Inspeções</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <ScheduleCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
                <h3 className="font-medium text-lg">Nenhum agendamento encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou crie um novo agendamento.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="visits">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents
              .filter(event => event.type === 'Visita')
              .map(event => (
                <ScheduleCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents
              .filter(event => event.type === 'Reunião')
              .map(event => (
                <ScheduleCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inspections">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents
              .filter(event => event.type === 'Inspeção')
              .map(event => (
                <ScheduleCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedule;
