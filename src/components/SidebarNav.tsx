
import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, href, active, onClick }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
  );
};

export function SidebarNav() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
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
      "fixed inset-y-0 left-0 bg-sidebar z-40 flex flex-col transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-vpro-coral flex items-center justify-center">
              <span className="text-white font-bold">VP</span>
            </div>
            <span className="font-bold text-sidebar-foreground">VPRO ENGENHARIA</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {routes.map((route) => (
          <NavItem 
            key={route.href}
            icon={route.icon}
            label={isCollapsed ? "" : route.label}
            href={route.href}
            active={location.pathname === route.href}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
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
