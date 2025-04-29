
import React from 'react';
import { Building, FileText, AlertTriangle, Calendar } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ProjectsSection from '@/components/dashboard/ProjectsSection';
import EventsSection from '@/components/dashboard/EventsSection';
import ClientPanelCard from '@/components/dashboard/ClientPanelCard';

export default function Dashboard() {
  const stats = [
    { icon: Building, title: 'Obras Ativas', value: '3', color: 'bg-blue-500' },
    { icon: FileText, title: 'Relatórios Gerados', value: '3', color: 'bg-purple-500' },
    { icon: AlertTriangle, title: 'Incidentes', value: '3', color: 'bg-red-500' },
    { icon: Calendar, title: 'Agendamentos', value: '3', color: 'bg-gray-500' },
  ];

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
      address: 'Curitiba, PR'
    },
  ].slice(0, 3);

  const upcomingEvents = [
    {
      title: 'Visita técnica - Aurora',
      date: '25 Nov',
      time: '09:00 - 11:00',
      type: 'Visita',
      users: ['JC', 'MF', 'RS']
    }
  ];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de controle, aqui você pode monitorar todas as suas obras.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="space-y-6">
        <ClientPanelCard />
        <ProjectsSection projects={projects} />
        <EventsSection events={upcomingEvents} />
      </div>
    </div>
  );
}
