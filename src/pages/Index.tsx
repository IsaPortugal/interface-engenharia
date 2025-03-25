
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Code, 
  FolderTree, 
  HomeIcon,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import refactored components
import ProjectDashboard from '@/components/tcc-obra/dashboard';
import ProjectStructure from '@/components/tcc-obra/project-structure';
import DevelopmentEnvironment from '@/components/tcc-obra/development';
import SystemArchitecture from '@/components/tcc-obra/architecture';

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [activeProject, setActiveProject] = useState("TCC - Obra");

  return (
    <div className="container mx-auto animate-fade-in py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Building className="mr-2 h-6 w-6 text-vpro-orange" />
            Solução TCC - Obra
          </h1>
          <p className="text-muted-foreground">
            Sistema integrado para gestão de obras e construções
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={activeProject} onValueChange={setActiveProject}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Selecionar projeto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TCC - Obra">TCC - Obra (1 de 1 projeto)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="dashboard" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4 bg-vpro-lightgray p-1">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
            <HomeIcon className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="projeto" className="data-[state=active]:bg-white">
            <FolderTree className="h-4 w-4 mr-2" />
            Estrutura do Projeto
          </TabsTrigger>
          <TabsTrigger value="desenvolvimento" className="data-[state=active]:bg-white">
            <Code className="h-4 w-4 mr-2" />
            Desenvolvimento
          </TabsTrigger>
          <TabsTrigger value="tecnologias" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            Ambiente
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <ProjectDashboard />
        </TabsContent>

        <TabsContent value="projeto">
          <ProjectStructure />
        </TabsContent>

        <TabsContent value="desenvolvimento">
          <DevelopmentEnvironment />
        </TabsContent>

        <TabsContent value="tecnologias">
          <SystemArchitecture />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
