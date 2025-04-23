
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building, Calendar, AlertTriangle, FileText } from "lucide-react";

const MainDashboardCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Obras Ativas</CardTitle>
        <CardDescription>Total de obras em andamento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-vpro-blue">3</div>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <Building className="h-4 w-4 mr-1" />
          <span>Obras cadastradas</span>
        </div>
      </CardContent>
    </Card>

    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Compromissos</CardTitle>
        <CardDescription>Pendentes nesta semana</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-green-500">3</div>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Agendados</span>
        </div>
      </CardContent>
    </Card>

    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Incidentes</CardTitle>
        <CardDescription>Reportados em aberto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-vpro-orange">3</div>
        <div className="flex items-center text-amber-500 text-sm mt-1">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>Pendentes</span>
        </div>
      </CardContent>
    </Card>
    
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Relatórios</CardTitle>
        <CardDescription>Gerados este mês</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-vpro-yellow">3</div>
        <div className="flex items-center text-green-500 text-sm mt-1">
          <FileText className="h-4 w-4 mr-1" />
          <span>Completos</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default MainDashboardCards;
