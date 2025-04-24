
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Code, Database, Package, Clock } from "lucide-react";

const ActivitiesTab = () => {
  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Atividades do Projeto</CardTitle>
          <CardDescription>Histórico de ações no projeto TCC - Obra</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center justify-center h-9 w-9 rounded-full mr-3 bg-blue-100 text-blue-600">
                <Github className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Commit: Atualização do Model de Obras</p>
                <p className="text-sm text-gray-600">Modificações em Models/Obra.cs</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Hoje, 14:35</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center justify-center h-9 w-9 rounded-full mr-3 bg-green-100 text-green-600">
                <Code className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Nova View: ListaObras</p>
                <p className="text-sm text-gray-600">Adicionada view para listagem de obras</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Ontem, 16:20</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center justify-center h-9 w-9 rounded-full mr-3 bg-amber-100 text-amber-600">
                <Database className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Atualização de Migrations</p>
                <p className="text-sm text-gray-600">Modificações na estrutura do banco de dados</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>15/06/2023, 09:45</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center justify-center h-9 w-9 rounded-full mr-3 bg-purple-100 text-purple-600">
                <Package className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Atualização de Dependências</p>
                <p className="text-sm text-gray-600">Entity Framework Core atualizado para v7.0.5</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>10/06/2023, 11:30</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="ghost" className="text-vpro-blue hover:text-vpro-orange hover:bg-vpro-lightgray w-full justify-center">
            Ver histórico completo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActivitiesTab;
