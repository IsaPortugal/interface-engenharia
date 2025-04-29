
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building, FileText, AlertTriangle, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { icon: LayoutDashboard, label: "Painel", href: "/" },
  { icon: Building, label: "Obras", href: "/obras" },
  { icon: Users, label: "Clientes", href: "/clientes" },
  { icon: FileText, label: "Relatórios", href: "/reports" },
  { icon: AlertTriangle, label: "Incidentes", href: "/incidents" },
  { icon: Calendar, label: "Compromissos", href: "/schedule" },
];

export function TopNavBar() {
  const location = useLocation();

  return (
    <nav className="w-full px-6 py-3 bg-gradient-to-br from-[#4b6cb7] to-[#182848] shadow-md flex items-center justify-center">
      <div className="flex items-center justify-between w-full mb-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-vpro-blue to-vpro-orange flex items-center justify-center shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-white" fill="none">
              <rect x="2" y="12" width="6" height="6" rx="2" fill="#fff" fillOpacity="0.85"/>
              <rect x="9" y="6" width="6" height="12" rx="2" fill="#fff" fillOpacity="0.85"/>
              <rect x="16" y="2" width="6" height="16" rx="2" fill="#fff" fillOpacity="0.85"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-white tracking-tight hidden sm:block">TCC_Obra</span>
        </div>
        {/* Menu de Navegação no Topo Horizontal */}
        <ul className="flex gap-4 md:gap-8 justify-center text-white font-semibold">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                to={route.href}
                className={cn(
                  "flex items-center px-2 md:px-3 py-2 rounded hover:bg-white/20 transition",
                  location.pathname === route.href ||
                  (location.pathname !== "/" &&
                    route.href !== "/" &&
                    location.pathname.startsWith(route.href))
                    ? "bg-white/30 shadow text-white"
                    : "text-white/90"
                )}
              >
                <route.icon className="w-5 h-5 mr-1 md:mr-2" />
                <span>{route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Empty space to balance the layout */}
        <div className="w-16 flex-shrink-0" />
      </div>
    </nav>
  );
}
