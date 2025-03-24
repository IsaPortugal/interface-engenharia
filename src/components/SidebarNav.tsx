
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  Calendar, 
  AlertTriangle, 
  Image, 
  Settings, 
  Menu, 
  X, 
  ChevronRight,
  PanelLeft,
  PanelRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, href, active, collapsed, onClick }: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 my-1 rounded-md text-sm font-medium transition-colors",
              active 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
            onClick={onClick}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
            {active && !collapsed && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarNavProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function SidebarNav({ collapsed, onToggle }: SidebarNavProps) {
  const location = useLocation();
  
  const routes = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Relatórios", href: "/reports" },
    { icon: AlertTriangle, label: "Incidentes", href: "/incidents" },
    { icon: Calendar, label: "Agendamentos", href: "/schedule" },
    { icon: Image, label: "Galeria", href: "/gallery" },
    { icon: Settings, label: "Configurações", href: "/settings" },
  ];

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 bg-sidebar z-40 flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-vpro-coral flex items-center justify-center">
              <span className="text-white font-bold">VP</span>
            </div>
            <span className="font-bold text-sidebar-foreground">VPRO ENGENHARIA</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-md bg-vpro-coral mx-auto flex items-center justify-center">
            <span className="text-white font-bold">VP</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="text-sidebar-foreground ml-auto"
        >
          {collapsed ? <PanelRight className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {routes.map((route) => (
          <NavItem 
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            active={location.pathname === route.href}
            collapsed={collapsed}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sidebar-accent-foreground font-medium">EF</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Eng. Fiscal</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">engenheiro@vpro.com.br</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
