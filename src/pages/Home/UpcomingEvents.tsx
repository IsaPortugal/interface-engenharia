
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const proximoEventos = [
  {
    id: 1,
    title: "Visita técnica com engenheiro",
    date: "25/06/2023",
    time: "09:00 - 11:00",
    location: "Av. Paulista, 1000, São Paulo",
    type: "Visita",
    description: "Visita técnica para acompanhamento do cronograma."
  },
  {
    id: 2,
    title: "Reunião com cliente",
    date: "27/06/2023",
    time: "14:30 - 15:30",
    location: "Escritório VPRO",
    type: "Reunião",
    description: "Apresentação do andamento das obras."
  },
  {
    id: 3,
    title: "Vistoria final",
    date: "30/06/2023",
    time: "10:00 - 12:00",
    location: "Rua das Flores, 500, Florianópolis",
    type: "Inspeção",
    description: "Vistoria final para liberação da fase 1."
  }
];

const UpcomingEvents = () => (
  <Card className="card-hover lg:col-span-1">
    <CardHeader>
      <CardTitle>Próximos Eventos</CardTitle>
      <CardDescription>Seus próximos compromissos</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {proximoEventos.map(evento => (
          <div key={evento.id} className="border rounded-lg p-4 mb-2 transition-shadow flex flex-col">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-vpro-blue" />
              <span className="font-medium">{evento.title}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 text-sm text-muted-foreground">
              <div className="flex items-center mb-1">
                <span className="mr-2 font-semibold">Data:</span>
                <span>{evento.date}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="mr-2 font-semibold">Horário:</span>
                <span>{evento.time}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="mr-2 font-semibold">Local:</span>
                <span>{evento.location}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="mr-2 font-semibold">Tipo:</span>
                <span>{evento.type}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {evento.description}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default UpcomingEvents;
