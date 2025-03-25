
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectTree } from './ProjectTree';

const ProjectStructure = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estrutura do Projeto</CardTitle>
        <CardDescription>Solução ASP.NET MVC</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-4 bg-gray-50">
          <ProjectTree />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStructure;
