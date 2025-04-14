
import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Buscando",
        description: `Pesquisando por "${searchQuery}"`,
      });
      setSearchQuery('');
    }
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm sticky top-0 z-30">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-vpro-blue to-vpro-orange flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">TC</span>
          </div>
          <span className="font-bold text-vpro-blue text-lg tracking-tight hidden md:block">TCC_Obra</span>
        </div>
      </div>

      {/* Centered Search Section */}
      <div className="flex-1 flex justify-center max-w-2xl mx-auto px-4">
        <form onSubmit={handleSearch} className="w-full relative">
          <Input
            type="search"
            placeholder="Buscar relatórios, obras, ou incidentes..."
            className="w-full pl-10 rounded-full bg-vpro-lightgray border-gray-200 focus-visible:ring-vpro-blue"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </form>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-vpro-blue ring-offset-2">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback className="bg-vpro-orange text-white font-medium">EF</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Eng. Fiscal</p>
                <p className="text-xs leading-none text-muted-foreground">
                  engenheiro@vpro.com.br
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
