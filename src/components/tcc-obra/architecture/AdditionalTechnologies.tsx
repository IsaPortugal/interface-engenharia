
import React from 'react';
import { Button } from '@/components/ui/button';
import { Server, Database, FileText, Globe } from 'lucide-react';

export const AdditionalTechnologies = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Tecnologias Adicionais</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Button variant="outline" className="justify-start">
          <Server className="mr-2 h-4 w-4" />
          Identity para Autenticação
        </Button>
        <Button variant="outline" className="justify-start">
          <Database className="mr-2 h-4 w-4" />
          EF Core Migrations
        </Button>
        <Button variant="outline" className="justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Relatórios PDF
        </Button>
        <Button variant="outline" className="justify-start">
          <Globe className="mr-2 h-4 w-4" />
          API REST
        </Button>
      </div>
    </div>
  );
};
