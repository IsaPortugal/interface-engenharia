
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderClosed, Code, Clock } from "lucide-react";
import MainDashboardCards from "./MainDashboardCards";
import UpcomingEvents from "./UpcomingEvents";
import RecentActivities from "./RecentActivities";
import { projetosTCC } from "@/data/projectData";

const DashboardTab = () => {
  return (
    <div className="space-y-6">
      <MainDashboardCards />
      <div className="grid grid-cols-1 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Obras em Andamento</CardTitle>
                <CardDescription>Gerenciamento de projetos ativos</CardDescription>
              </div>
              <Button className="bg-vpro-orange hover:bg-vpro-yellow hover:text-black">
                Novo Projeto
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {projetosTCC.map(projeto => (
              <div key={projeto.id} className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-vpro-blue flex items-center">
                      <FolderClosed className="h-5 w-5 mr-2 text-vpro-orange" />
                      {projeto.nome}
                      <Badge className="ml-3 bg-green-100 text-green-700">{projeto.status}</Badge>
                    </h3>
                    <p className="text-gray-600 mt-1">{projeto.descricao}</p>
                    
                    <div className="flex mt-3 space-x-4">
                      <div className="text-sm text-gray-500 flex items-center">
                        <Code className="h-4 w-4 mr-1" />
                        <span>{projeto.tipo}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Atualizado: {projeto.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="text-vpro-blue border-vpro-blue hover:bg-vpro-blue hover:text-white">
                    Abrir Projeto
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <UpcomingEvents />
        <RecentActivities />
      </div>
    </div>
  );
};

export default DashboardTab;
