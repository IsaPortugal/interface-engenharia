
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Building, 
  Users, 
  AlertTriangle, 
  FileText,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectsSection from '@/components/dashboard/ProjectsSection';
import EventsSection from '@/components/dashboard/EventsSection';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const projects = [
    {
      title: 'Edifício Residencial Aurora',
      client: 'Construtora Horizonte',
      progress: 75,
      dueDate: '15/12/2023',
      status: 'Em andamento' as const,
      address: 'Porto Alegre, RS',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
    },
    {
      title: 'Centro Comercial Vitória',
      client: 'Empreendimentos RS',
      progress: 45,
      dueDate: '30/01/2024',
      status: 'Em andamento' as const,
      address: 'Florianópolis, SC',
      image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=2670&auto=format&fit=crop'
    },
    {
      title: 'Condomínio Park Avenue',
      client: 'Grupo Construtora ABC',
      progress: 65,
      dueDate: '10/11/2023',
      status: 'Atrasado' as const,
      address: 'Curitiba, PR',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2670&auto=format&fit=crop'
    },
  ];

  const upcomingEvents = [
    {
      title: 'Visita técnica - Aurora',
      date: '25 Nov',
      time: '09:00 - 11:00',
      type: 'Visita',
      users: ['JC', 'MF', 'RS'],
      location: 'Porto Alegre, RS'
    }
  ];

  const handleViewAllProjects = () => {
    navigate('/obras');
  };

  const handleViewSchedule = () => {
    navigate('/schedule');
  };

  return (
    <div className="space-y-8 p-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel</h1>
        <p className="text-muted-foreground">Bem vindo ao seu painel de controle, aqui você pode monitorar todas as suas obras.</p>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-vpro-blue to-vpro-orange text-white">
          <CardTitle className="text-2xl">Bem-vindo ao Sistema VPro Engenharia</CardTitle>
          <CardDescription className="text-white/90">Sistema integrado de gerenciamento de construções</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4">
            O VPro Engenharia é uma solução completa para o gerenciamento de suas obras e projetos de construção civil.
            Com ele você pode realizar:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start space-x-3">
              <Users className="h-10 w-10 text-vpro-blue bg-blue-50 p-2 rounded-lg" />
              <div>
                <h3 className="font-medium">Cadastro de Clientes</h3>
                <p className="text-sm text-muted-foreground">Gerencie todos os seus clientes e contratos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Building className="h-10 w-10 text-vpro-orange bg-orange-50 p-2 rounded-lg" />
              <div>
                <h3 className="font-medium">Cadastro de Obras</h3>
                <p className="text-sm text-muted-foreground">Organize e acompanhe todos os seus projetos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-10 w-10 text-yellow-600 bg-yellow-50 p-2 rounded-lg" />
              <div>
                <h3 className="font-medium">Gestão de Incidentes</h3>
                <p className="text-sm text-muted-foreground">Registre e acompanhe ocorrências</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="h-10 w-10 text-purple-600 bg-purple-50 p-2 rounded-lg" />
              <div>
                <h3 className="font-medium">Agenda de Compromissos</h3>
                <p className="text-sm text-muted-foreground">Visualize e organize seus eventos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileText className="h-10 w-10 text-green-600 bg-green-50 p-2 rounded-lg" />
              <div>
                <h3 className="font-medium">Geração de Relatórios</h3>
                <p className="text-sm text-muted-foreground">Crie documentações completas de seus projetos</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <ProjectsSection projects={projects} onViewAll={handleViewAllProjects} />
        <EventsSection events={upcomingEvents} onViewSchedule={handleViewSchedule} />
      </div>
    </div>
  );
}
