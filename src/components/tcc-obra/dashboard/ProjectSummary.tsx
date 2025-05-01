
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ProjectSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do Projeto</CardTitle>
        <CardDescription>Informações sobre o VPro Engenharia</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          O projeto VPro Engenharia é um sistema integrado para gestão de obras e construções,
          desenvolvido como trabalho de conclusão de curso. Utilizando o padrão MVC com C#
          e ASP.NET Core, esta solução está estruturada para oferecer gerenciamento
          completo do ciclo de vida de projetos de construção.
        </p>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Principais funcionalidades:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Gerenciamento de obras e projetos</li>
            <li>Acompanhamento de atividades</li>
            <li>Controle de materiais e fornecedores</li>
            <li>Geração de relatórios técnicos</li>
            <li>Dashboard para visualização de dados</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
