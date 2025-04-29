
import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ClientPanelCard = () => {
  const navigate = useNavigate();

  const handleViewAllClients = () => {
    navigate('/clientes');
  };

  return (
    <Card className="shadow-md mb-6 border-none hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <User className="h-6 w-6 mr-2 text-primary" />
            <div>
              <CardTitle className="text-xl">Painel de Clientes</CardTitle>
              <CardDescription>Visualize e gerencie seus clientes</CardDescription>
            </div>
          </div>
          <Button onClick={handleViewAllClients} className="gap-1">
            Ver todos os clientes
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-muted-foreground">
          Acesse o painel completo para visualizar e gerenciar informações detalhadas de todos os clientes cadastrados no sistema.
        </p>
      </CardContent>
    </Card>
  );
};

export default ClientPanelCard;
