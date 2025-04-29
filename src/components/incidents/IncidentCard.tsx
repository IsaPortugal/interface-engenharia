
import React from 'react';
import { Calendar, Eye, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface Incident {
  id: number;
  title: string;
  project: string;
  status: 'Em aberto' | 'Resolvido';
  severity: string;
  date: string;
  assignedTo: string;
  description: string;
}

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard = ({ incident }: IncidentCardProps) => {
  const statusColors = {
    'Em aberto': 'bg-blue-100 text-blue-800',
    'Resolvido': 'bg-green-100 text-green-800'
  };

  const handleViewClick = () => {
    toast.info(`Visualizando incidente: ${incident.title}`);
  };

  const handleEditClick = () => {
    toast.info(`Editando incidente: ${incident.title}`);
  };

  const handleDeleteClick = () => {
    toast.error(`Excluindo incidente: ${incident.title}`);
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{incident.title}</CardTitle>
            <CardDescription className="text-sm">{incident.project}</CardDescription>
          </div>
          <Badge className={statusColors[incident.status]}>
            {incident.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-700 mb-4">{incident.description}</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{incident.date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button size="sm" variant="outline" onClick={handleViewClick}>
          <Eye className="mr-1 h-4 w-4" />
          Visualizar
        </Button>
        <Button size="sm" variant="outline" onClick={handleEditClick}>
          <Pencil className="mr-1 h-4 w-4" />
          Editar
        </Button>
        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={handleDeleteClick}>
          <Trash2 className="mr-1 h-4 w-4" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IncidentCard;
