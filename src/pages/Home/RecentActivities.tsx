
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Calendar, Activity, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const activityItems = [
  { id: 1, title: "Relatório diário concluído", time: "09:15", status: "success", icon: CheckCircle2 },
  { id: 2, title: "Incidente reportado", time: "11:30", status: "warning", icon: AlertTriangle },
  { id: 3, title: "Visita técnica agendada", time: "13:45", status: "info", icon: Calendar },
  { id: 4, title: "Análise de métricas", time: "16:20", status: "success", icon: Activity },
];

const RecentActivities = () => (
  <Card className="card-hover lg:col-span-1">
    <CardHeader>
      <CardTitle>Atividades Recentes</CardTitle>
      <CardDescription>Últimas 24 horas</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {activityItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start">
              <div className={`flex items-center justify-center h-9 w-9 rounded-full mr-3 ${
                item.status === 'success' ? 'bg-green-100 text-green-600' :
                item.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
    <CardFooter className="border-t px-6 py-4">
      <Button variant="ghost" className="text-vpro-blue hover:text-vpro-orange hover:bg-vpro-lightgray w-full justify-center">
        Ver todas as atividades
      </Button>
    </CardFooter>
  </Card>
);

export default RecentActivities;
