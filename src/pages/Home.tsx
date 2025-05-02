
import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardTab from "./Home/DashboardTab";
import ProjectsTab from "./Home/ProjectsTab";
import StructureTab from "./Home/StructureTab";
import ActivitiesTab from "./Home/ActivitiesTab";

const Home = () => {
  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in overflow-auto">
      <div className="bg-gradient-to-r from-vpro-blue to-vpro-orange rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">Bem-vindo ao Dashboard VPRO</h1>
          <p className="text-xl opacity-90 mb-6">
            Monitore e gerencie todos os seus projetos em um só lugar com eficiência e produtividade.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-white text-vpro-orange hover:bg-vpro-yellow hover:text-black">
              Iniciar agora
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              Ver tutorial
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="flex-1 flex flex-col">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="projetos">Projetos</TabsTrigger>
          <TabsTrigger value="estrutura">Estrutura</TabsTrigger>
          <TabsTrigger value="atividades">Atividades</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="dashboard" className="h-full">
            <DashboardTab />
          </TabsContent>
          
          <TabsContent value="projetos" className="h-full">
            <ProjectsTab />
          </TabsContent>
          
          <TabsContent value="estrutura" className="h-full">
            <StructureTab />
          </TabsContent>
          
          <TabsContent value="atividades" className="h-full">
            <ActivitiesTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Home;
