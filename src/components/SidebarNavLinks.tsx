
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home as LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  Image, 
  Settings,
  Building,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Links das rotas do sistema
export const sidebarLinks = [
  {
    title: 'Painel',
    icon: LayoutDashboard,
    href: '/',
    variant: 'default'
  },
  {
    title: 'Clientes',
    icon: Users,
    href: '/clientes',
    variant: 'ghost'
  },
  {
    title: 'Obras',
    icon: Building,
    href: '/obras',
    variant: 'ghost'
  },
  {
    title: 'Incidentes',
    icon: AlertTriangle,
    href: '/incidents',
    variant: 'ghost'
  },
  {
    title: 'Agendamentos',
    icon: Calendar,
    href: '/schedule',
    variant: 'ghost'
  },
  {
    title: 'Relatórios',
    icon: FileText,
    href: '/reports',
    variant: 'ghost'
  },
  {
    title: 'Galeria',
    icon: Image,
    href: '/gallery',
    variant: 'ghost'
  },
  {
    title: 'Configurações',
    icon: Settings,
    href: '/settings',
    variant: 'ghost'
  }
];

// Componente de link de navegação
export const NavItem = ({ 
  collapsed, 
  icon: Icon, 
  title, 
  variant, 
  href 
}: { 
  collapsed: boolean; 
  icon: any; 
  title: string; 
  variant: string; 
  href: string; 
}) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-x-2 px-3 py-2 rounded-md text-sm",
          isActive 
            ? "bg-primary/10 text-primary font-medium" 
            : "text-muted-foreground font-normal",
          collapsed && "justify-center px-2"
        )
      }
    >
      <Icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
      {!collapsed && <span>{title}</span>}
    </NavLink>
  );
};
