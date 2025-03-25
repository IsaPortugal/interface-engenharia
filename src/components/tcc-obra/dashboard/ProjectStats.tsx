
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ProjectStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Total de Obras</CardTitle>
          <CardDescription>Obras cadastradas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-vpro-blue">12</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Atividades</CardTitle>
          <CardDescription>Atividades em andamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-vpro-orange">28</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Relatórios</CardTitle>
          <CardDescription>Relatórios gerados este mês</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-vpro-yellow">7</div>
        </CardContent>
      </Card>
    </div>
  );
};
