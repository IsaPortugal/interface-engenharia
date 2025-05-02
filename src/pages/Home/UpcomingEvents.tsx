
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import UpcomingEventCard from "@/components/dashboard/UpcomingEventCard";

const proximoEventos = [
  {
    id: 1,
    title: "Visita técnica com engenheiro",
    date: "25 Jun",
    time: "09:00 - 11:00",
    location: "Av. Paulista, 1000, São Paulo"
  },
  {
    id: 2,
    title: "Reunião com cliente",
    date: "27 Jun",
    time: "14:30 - 15:30",
    location: "Escritório VPro"
  },
  {
    id: 3,
    title: "Vistoria final",
    date: "30 Jun",
    time: "10:00 - 12:00",
    location: "Rua das Flores, 500, Florianópolis"
  }
];

const UpcomingEvents = () => (
  <Card>
    <CardHeader>
      <CardTitle>Próximos Eventos</CardTitle>
      <CardDescription>Seus próximos compromissos</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {proximoEventos.map(evento => (
          <UpcomingEventCard 
            key={evento.id}
            title={evento.title}
            date={evento.date}
            time={evento.time}
            location={evento.location}
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default UpcomingEvents;
