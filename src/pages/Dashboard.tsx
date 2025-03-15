
import React from 'react';
import { 
  Building, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const StatCard = ({ icon: Icon, title, value, trend, color }: any) => (
  <Card className="card-hover">
    <CardContent className="p-6 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {trend && (
          <p className={`text-xs ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
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
}

const ProjectCard = ({ title, client, progress, dueDate, status }: ProjectCardProps) => {
  const statusColor = 
    status === 'Em andamento' ? 'bg-blue-500' : 
    status === 'Atrasado' ? 'bg-vpro-coral' : 'bg-green-500';
  
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{client}</CardDescription>
          </div>
          <div className={`${statusColor} text-white text-xs font-medium py-1 px-2 rounded-full`}>
            {status}
          </div>
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
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const UpcomingEventCard = ({ title, date, time, type }: any) => {
  const typeColor = 
    type === 'Reunião' ? 'bg-blue-100 text-blue-800' : 
    type === 'Visita' ? 'bg-green-100 text-green-800' : 
    'bg-yellow-100 text-yellow-800';
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex flex-col items-center justify-center text-center min-w-[40px]">
        <span className="text-xl font-bold">{date.split(' ')[0]}</span>
        <span className="text-xs text-muted-foreground">{date.split(' ')[1]}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{time}</p>
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
    { icon: FileText, title: 'Relatórios Gerados', value: '48', trend: '+15', color: 'bg-vpro-lightblue' },
    { icon: AlertTriangle, title: 'Incidentes', value: '3', trend: '-1', color: 'bg-vpro-coral' },
    { icon: Calendar, title: 'Compromissos', value: '8', trend: '+3', color: 'bg-vpro-gray' },
  ];

  const projects = [
    { title: 'Edifício Residencial Aurora', client: 'Construtora Horizonte', progress: 75, dueDate: '15/12/2023', status: 'Em andamento' as const },
    { title: 'Centro Comercial Vitória', client: 'Empreendimentos RS', progress: 45, dueDate: '30/01/2024', status: 'Em andamento' as const },
    { title: 'Condomínio Park Avenue', client: 'Grupo Construtora ABC', progress: 65, dueDate: '10/11/2023', status: 'Atrasado' as const },
    { title: 'Hospital São Lucas - Ampliação', client: 'Secretaria de Saúde', progress: 90, dueDate: '05/12/2023', status: 'Em andamento' as const },
  ];

  const upcomingEvents = [
    { title: 'Visita técnica - Aurora', date: '25 Nov', time: '09:00 - 11:00', type: 'Visita' },
    { title: 'Reunião com cliente - Grupo ABC', date: '27 Nov', time: '14:30 - 15:30', type: 'Reunião' },
    { title: 'Vistoria final - Hospital', date: '30 Nov', time: '10:00 - 12:00', type: 'Inspeção' },
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Desempenho</h2>
              <Button variant="outline" className="text-sm">
                Relatório Completo
              </Button>
            </div>
            <Card>
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
          <Card>
            <CardContent className="p-4 space-y-3">
              {upcomingEvents.map((event, index) => (
                <UpcomingEventCard key={index} {...event} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
