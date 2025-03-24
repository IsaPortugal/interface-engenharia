
import React, { useState } from 'react';
import { Search, Bell, Calendar, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
    <header className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex-1 flex items-center max-w-md">
        <form onSubmit={handleSearch} className="w-full relative">
          <Input
            type="search"
            placeholder="Buscar relatórios, obras, ou incidentes..."
            className="w-full pl-10 rounded-full bg-gray-50 border-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </form>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <Button variant="outline" size="icon" className="relative rounded-full">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button variant="outline" size="icon" className="relative rounded-full">
          <Calendar className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-vpro-coral">
            3
          </Badge>
        </Button>
        
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-vpro-coral">
            2
          </Badge>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback>EF</AvatarFallback>
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
            <DropdownMenuItem>
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
