
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderClosed } from "lucide-react";
import { estruturaProjeto } from "@/data/projectData";

const StructureTab = () => {
  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Estrutura de Projeto: TCC - Obra</CardTitle>
              <CardDescription>Visualização da hierarquia do projeto</CardDescription>
            </div>
            <Button variant="outline" className="text-vpro-blue border-vpro-blue hover:bg-vpro-blue hover:text-white">
              Expandir Tudo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4">
            <div className="mb-3 pl-2 flex items-center text-lg font-semibold">
              <FolderClosed className="h-5 w-5 mr-2 text-vpro-orange" />
              Solução 'TCC - Obra' (1 de 1 projeto)
            </div>
            
            <div className="pl-6 space-y-3">
              {estruturaProjeto.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-center border-l border-dashed border-gray-400 pl-4 py-1">
                    <Icon className={`h-5 w-5 mr-2 ${
                      item.tipo === 'codigo' ? 'text-vpro-blue' :
                      item.tipo === 'dados' ? 'text-green-600' :
                      item.tipo === 'interface' ? 'text-purple-600' :
                      item.tipo === 'configuracao' ? 'text-amber-600' :
                      'text-gray-600'
                    }`} />
                    <span>{item.nome}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="bg-vpro-blue hover:bg-vpro-orange w-full justify-center">
            Gerenciar Componentes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StructureTab;
