
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Building, 
  FileText, 
  AlertTriangle, 
  Calendar,
  PanelLeft,
  PanelRight,
  ChevronRight,
  LayoutDashboard,
  User
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
              "flex items-center gap-3 px-4 py-3 my-1 rounded-lg text-sm font-medium",
              active 
                ? "bg-white/20 text-white shadow-sm" 
                : "text-white/80"
            )}
            onClick={onClick}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <span className={cn("truncate", active ? "font-semibold" : "")}>{label}</span>
            )}
            {active && !collapsed && (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="left" className="bg-white text-gray-800 border-none shadow-lg">
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

const SidebarNav = ({ collapsed, onToggle }: SidebarNavProps) => {
  const location = useLocation();
  
  const routes = [
    { icon: LayoutDashboard, label: "Painel", href: "/" },
    { icon: User, label: "Clientes", href: "/clientes" },
    { icon: Building, label: "Obras", href: "/obras" },
    { icon: AlertTriangle, label: "Incidentes", href: "/incidents" },
    { icon: Calendar, label: "Agendamentos", href: "/schedule" },
    { icon: FileText, label: "Relatórios", href: "/reports" },
  ];

  return (
    <div className={cn(
      "fixed inset-y-0 right-0 z-40 flex flex-col shadow-xl",
      "bg-gradient-to-br from-[#4b6cb7] to-[#182848]",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-white/20 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">VP</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">VPro Engenharia</span>
          </div>
        )}
        {collapsed && (
          <div className="h-10 w-10 rounded-md bg-white/20 mx-auto flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">VP</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="text-white ml-auto"
        >
          {collapsed ? <PanelLeft className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {routes.map((route) => (
          <NavItem 
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            active={location.pathname === route.href || 
                    (location.pathname === "/" && route.href === "/") ||
                    (location.pathname !== "/" && route.href !== "/" && location.pathname.startsWith(route.href))}
            collapsed={collapsed}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-white/10 bg-white/5">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shadow-sm">
              <span className="text-white font-medium">EF</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Eng. Fiscal</p>
              <p className="text-xs text-white/70 truncate">engenheiro@vpro.com.br</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shadow-sm">
              <span className="text-white font-medium">EF</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { SidebarNav };
