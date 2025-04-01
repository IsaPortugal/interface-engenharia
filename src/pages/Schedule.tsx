
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, Search, Plus, Filter, ArrowUpRight, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    description: 'Visita técnica para acompanhamento do cronograma de obras e verificação da qualidade dos serviços realizados.'
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
    description: 'Apresentação do andamento das obras e discussão sobre ajustes no cronograma.'
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
    description: 'Vistoria final para liberação da fase 1 do projeto.'
  },
  {
    id: 4,
    title: 'Reunião de kick-off',
    project: 'Condomínio Park Avenue',
    date: '2023-12-05',
    time: '09:30 - 11:30',
    location: 'Escritório VPRO',
    type: 'Reunião',
    participants: ['EF', 'RS', 'JC', 'PL'],
    description: 'Reunião inicial para alinhamento da equipe e fornecedores.'
  },
  {
    id: 5,
    title: 'Entrega de material',
    project: 'Edifício Residencial Aurora',
    date: '2023-12-10',
    time: '08:00 - 10:00',
    location: 'Av. Paulista, 1000, São Paulo',
    type: 'Entrega',
    participants: ['TC', 'MR'],
    description: 'Acompanhamento da entrega de material para a próxima fase da construção.'
  }
];

const ScheduleCard = ({ event }: { event: any }) => {
  const typeColors = {
    'Visita': 'bg-green-100 text-green-800',
    'Reunião': 'bg-blue-100 text-blue-800',
    'Inspeção': 'bg-orange-100 text-orange-800',
    'Entrega': 'bg-purple-100 text-purple-800'
  };

  const date = new Date(event.date);
  const formattedDate = format(date, 'dd MMM', { locale: ptBR });

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{event.title}</CardTitle>
            <CardDescription className="text-sm">{event.project}</CardDescription>
          </div>
          <Badge className={typeColors[event.type as keyof typeof typeColors]}>
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
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex -space-x-2">
              {event.participants.map((participant: string, index: number) => (
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

const ScheduleForm = ({ onClose }: { onClose: () => void }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                >
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
                <SelectItem value="1400">14:00 - 15:00</SelectItem>
                <SelectItem value="1500">15:00 - 16:00</SelectItem>
                <SelectItem value="1600">16:00 - 17:00</SelectItem>
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
              <SelectItem value="hospital">Hospital São Lucas</SelectItem>
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
              <SelectItem value="entrega">Entrega</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">Local</Label>
          <Input id="location" placeholder="Endereço ou nome do local" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="participants">Participantes</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione participantes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ef">Eng. Fiscal (EF)</SelectItem>
              <SelectItem value="rs">Roberto Silva (RS)</SelectItem>
              <SelectItem value="tc">Técnico Carlos (TC)</SelectItem>
              <SelectItem value="mf">Maria Fernandes (MF)</SelectItem>
              <SelectItem value="jc">João Costa (JC)</SelectItem>
              <SelectItem value="pl">Paulo Lima (PL)</SelectItem>
            </SelectContent>
          </Select>
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

const statsData = [
  { title: 'Agendamentos', value: '32', trend: '+5', icon: CalendarIcon, color: 'bg-blue-100 text-blue-800' },
  { title: 'Esta Semana', value: '8', trend: '+2', icon: Clock, color: 'bg-green-100 text-green-800' },
  { title: 'Próximo Mês', value: '15', trend: '+4', icon: Building, color: 'bg-purple-100 text-purple-800' },
];

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredEvents = scheduleData.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container max-w-6xl mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <CalendarIcon className="mr-2 h-6 w-6 text-blue-500" />
            Agendamentos
          </h1>
          <p className="text-muted-foreground">Gerencie seus compromissos e eventos relacionados às obras</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" /> 
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <ScheduleForm onClose={() => setDialogOpen(false)} />
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
              <div className="mt-2">
                <span className="text-xs flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.trend} este mês
                </span>
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
              placeholder="Buscar agendamentos por título, projeto ou tipo..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filtrar
          </Button>
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
