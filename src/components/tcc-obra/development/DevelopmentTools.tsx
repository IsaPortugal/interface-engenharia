
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Server, Code, FileText } from 'lucide-react';

export const DevelopmentTools = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Ferramentas de Desenvolvimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border rounded-md p-3">
            <div className="flex items-center mb-2">
              <Settings className="h-5 w-5 mr-2 text-vpro-blue" />
              <span className="font-medium">Visual Studio 2022</span>
            </div>
            <p className="text-sm text-gray-600">IDE principal para desenvolvimento C# e ASP.NET</p>
          </div>
          
          <div className="border rounded-md p-3">
            <div className="flex items-center mb-2">
              <Server className="h-5 w-5 mr-2 text-vpro-orange" />
              <span className="font-medium">SQL Server Management Studio</span>
            </div>
            <p className="text-sm text-gray-600">Gerenciamento e consulta de banco de dados</p>
          </div>
          
          <div className="border rounded-md p-3">
            <div className="flex items-center mb-2">
              <Code className="h-5 w-5 mr-2 text-vpro-yellow" />
              <span className="font-medium">Git/GitHub</span>
            </div>
            <p className="text-sm text-gray-600">Controle de versão e colaboração</p>
          </div>
          
          <div className="border rounded-md p-3">
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              <span className="font-medium">Azure DevOps</span>
            </div>
            <p className="text-sm text-gray-600">Gestão de projetos e pipelines CI/CD</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
