
import React from 'react';
import { 
  Building, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  ArrowUpRight,
  MapPin,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const StatCard = ({ icon: Icon, title, value, trend, color }: any) => (
  <Card className="card-hover overflow-hidden border-none shadow-md">
    <CardContent className="p-6 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {trend && (
          <p className={`text-xs ${trend.includes('+') ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {trend.includes('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1 rotate-180" />}
            {trend} em relação ao mês anterior
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

interface ProjectCardProps {
  title: string;
  client: string;
  progress: number;
  dueDate: string;
  status: 'Em andamento' | 'Atrasado' | 'Concluído';
  address?: string;
  image?: string;
}

const ProjectCard = ({ title, client, progress, dueDate, status, address, image }: ProjectCardProps) => {
  const statusColor = 
    status === 'Em andamento' ? 'bg-vpro-blue' : 
    status === 'Atrasado' ? 'bg-vpro-pink' : 'bg-green-500';
  
  return (
    <Card className="card-hover overflow-hidden border-none shadow-md">
      {image && (
        <div className="relative h-40 w-full overflow-hidden">
          <img 
            src={image || "/placeholder.svg"} 
            alt={title} 
            className="object-cover w-full h-full"
          />
          <div className={`${statusColor} text-white text-xs font-medium py-1 px-2 rounded-full absolute top-3 right-3`}>
            {status}
          </div>
        </div>
      )}
      <CardHeader className={image ? "pb-2 pt-3" : "pb-2"}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{client}</CardDescription>
            {address && (
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {address}
              </div>
            )}
          </div>
          {!image && (
            <div className={`${statusColor} text-white text-xs font-medium py-1 px-2 rounded-full`}>
              {status}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Prazo: {dueDate}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const UpcomingEventCard = ({ title, date, time, type, users }: any) => {
  const typeColor = 
    type === 'Reunião' ? 'bg-vpro-blue/10 text-vpro-blue' : 
    type === 'Visita' ? 'bg-green-100 text-green-800' : 
    'bg-vpro-purple/10 text-vpro-purple';
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex flex-col items-center justify-center text-center min-w-[48px] h-[48px] bg-vpro-lightgray rounded-md">
        <span className="text-xl font-bold">{date.split(' ')[0]}</span>
        <span className="text-xs text-muted-foreground">{date.split(' ')[1]}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{time}</p>
        {users && (
          <div className="flex -space-x-2 mt-1">
            {users.map((user: string, index: number) => (
              <Avatar key={index} className="h-6 w-6 border-2 border-background">
                <AvatarFallback>{user}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
      </div>
      <div className={`${typeColor} py-1 px-2 rounded-full text-xs font-medium`}>
        {type}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const stats = [
    { icon: Building, title: 'Obras Ativas', value: '12', trend: '+2', color: 'bg-vpro-blue' },
    { icon: FileText, title: 'Relatórios Gerados', value: '48', trend: '+15', color: 'bg-vpro-purple' },
    { icon: AlertTriangle, title: 'Incidentes', value: '3', trend: '-1', color: 'bg-vpro-pink' },
    { icon: Calendar, title: 'Compromissos', value: '8', trend: '+3', color: 'bg-gray-500' },
  ];

  const projects = [
    { 
      title: 'Edifício Residencial Aurora', 
      client: 'Construtora Horizonte', 
      progress: 75, 
      dueDate: '15/12/2023', 
      status: 'Em andamento' as const,
      address: 'Porto Alegre, RS',
      image: 'public/lovable-uploads/90ed10ea-b3e2-4f93-83a0-9d102f1713e1.png'
    },
    { 
      title: 'Centro Comercial Vitória', 
      client: 'Empreendimentos RS', 
      progress: 45, 
      dueDate: '30/01/2024', 
      status: 'Em andamento' as const,
      address: 'Florianópolis, SC',
      image: 'public/lovable-uploads/138e1e42-e6d9-41f4-99d9-5c3d18a47ff0.png'
    },
    { 
      title: 'Condomínio Park Avenue', 
      client: 'Grupo Construtora ABC', 
      progress: 65, 
      dueDate: '10/11/2023', 
      status: 'Atrasado' as const,
      address: 'Curitiba, PR'
    },
    { 
      title: 'Hospital São Lucas - Ampliação', 
      client: 'Secretaria de Saúde', 
      progress: 90, 
      dueDate: '05/12/2023', 
      status: 'Em andamento' as const,
      address: 'Joinville, SC'
    },
  ];

  const upcomingEvents = [
    { 
      title: 'Visita técnica - Aurora', 
      date: '25 Nov', 
      time: '09:00 - 11:00', 
      type: 'Visita',
      users: ['JC', 'MF', 'RS']
    },
    { 
      title: 'Reunião com cliente - Grupo ABC', 
      date: '27 Nov', 
      time: '14:30 - 15:30', 
      type: 'Reunião',
      users: ['EF', 'PL']
    },
    { 
      title: 'Vistoria final - Hospital', 
      date: '30 Nov', 
      time: '10:00 - 12:00', 
      type: 'Inspeção',
      users: ['EF', 'TC', 'MR']
    },
  ];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de controle, aqui você pode monitorar todas as suas obras.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Obras em Andamento</h2>
              <Button variant="outline" className="text-sm">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="cards" className="mb-4">
              <TabsList>
                <TabsTrigger value="cards">Lista</TabsTrigger>
                <TabsTrigger value="carousel">Destaques</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cards" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="carousel" className="mt-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {projects.filter(p => p.image).map((project, index) => (
                      <CarouselItem key={index} className="md:basis-1/2">
                        <ProjectCard {...project} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Desempenho</h2>
              <Button variant="outline" className="text-sm">
                Relatório Completo
              </Button>
            </div>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="h-[200px] flex items-center justify-center border rounded-md">
                  <TrendingUp className="h-12 w-12 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Próximos Eventos</h2>
            <Button variant="outline" className="text-sm">
              Ver agenda
            </Button>
          </div>
          <Card className="border-none shadow-md">
            <CardContent className="p-4 space-y-3">
              {upcomingEvents.map((event, index) => (
                <UpcomingEventCard key={index} {...event} />
              ))}
            </CardContent>
            <CardFooter className="pt-0 pb-4 px-4">
              <Button className="w-full" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Criar novo evento
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
