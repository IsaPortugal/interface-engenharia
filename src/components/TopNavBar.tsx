
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Building, FileText, AlertTriangle, Image, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const routes = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Building, label: "Obras", href: "/obras" },
  { icon: FileText, label: "Relatórios", href: "/reports" },
  { icon: AlertTriangle, label: "Incidentes", href: "/incidents" },
  { icon: Image, label: "Galeria", href: "/gallery" },
  { icon: Settings, label: "Configurações", href: "/settings" },
];

export function TopNavBar() {
  const location = useLocation();
  const [search, setSearch] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Opcional: implementar funcionalidade real de busca
    setSearch("");
  };

  return (
    <nav className="w-full px-6 py-3 bg-gradient-to-br from-[#4b6cb7] to-[#182848] shadow-md flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-8">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-vpro-blue to-vpro-orange flex items-center justify-center shadow-md">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-white" fill="none">
            <rect x="2" y="12" width="6" height="6" rx="2" fill="#fff" fillOpacity="0.85"/>
            <rect x="9" y="6" width="6" height="12" rx="2" fill="#fff" fillOpacity="0.85"/>
            <rect x="16" y="2" width="6" height="16" rx="2" fill="#fff" fillOpacity="0.85"/>
          </svg>
        </div>
        <span className="text-lg font-bold text-white tracking-tight hidden sm:block">TCC_Obra</span>
      </div>

      {/* Links de navegação */}
      <div className="flex-1 flex justify-center">
        <ul className="flex gap-2 sm:gap-4">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                to={route.href}
                className={cn(
                  "flex items-center px-3 py-2 text-white/90 font-medium rounded hover:bg-white/15 transition",
                  location.pathname === route.href ||
                    (location.pathname !== "/" &&
                      route.href !== "/" &&
                      location.pathname.startsWith(route.href))
                    ? "bg-white/20 text-white shadow"
                    : ""
                )}
              >
                <route.icon className="w-5 h-5 mr-2" />
                <span className="hidden xs:inline">{route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Busca */}
      <form
        onSubmit={handleSearch}
        className="flex-1 flex justify-center max-w-xs mx-3"
      >
        <Input
          type="search"
          className="w-full rounded-full bg-white/20 border-none text-white placeholder:text-white/60 focus-visible:ring-vpro-blue"
          placeholder="Buscar relatórios, obras, incidentes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
    </nav>
  );
}

