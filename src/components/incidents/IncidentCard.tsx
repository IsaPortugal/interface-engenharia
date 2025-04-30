
import React, { useState } from 'react';
import { Calendar, Eye, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Incident {
  id: number;
  title: string;
  project: string;
  status: 'Em aberto' | 'Resolvido';
  severity: string; // Keep in the type but don't display it
  date: string;
  assignedTo: string;
  description: string;
}

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard = ({ incident }: IncidentCardProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const statusColors = {
    'Em aberto': 'bg-blue-100 text-blue-800',
    'Resolvido': 'bg-green-100 text-green-800'
  };

  const handleViewClick = () => {
    setDetailsOpen(true);
  };

  const handleEditClick = () => {
    toast.info(`Editando incidente: ${incident.title}`);
  };

  const handleDeleteClick = () => {
    toast.error(`Excluindo incidente: ${incident.title}`);
  };

  return (
    <>
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

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{incident.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <h3 className="font-medium">Projeto</h3>
              <p>{incident.project}</p>
            </div>
            <div className="grid gap-2">
              <h3 className="font-medium">Status</h3>
              <Badge className={statusColors[incident.status]}>
                {incident.status}
              </Badge>
            </div>
            <div className="grid gap-2">
              <h3 className="font-medium">Data</h3>
              <p>{incident.date}</p>
            </div>
            <div className="grid gap-2">
              <h3 className="font-medium">Responsável</h3>
              <p>{incident.assignedTo}</p>
            </div>
            {/* Severity field removed */}
            <div className="grid gap-2">
              <h3 className="font-medium">Descrição</h3>
              <p>{incident.description}</p>
            </div>
            {/* Image placeholder - in a real app, you'd map through images */}
            <div className="grid gap-2">
              <h3 className="font-medium">Imagens</h3>
              <div className="bg-gray-100 h-40 flex items-center justify-center border rounded-md">
                <p className="text-gray-400">Imagens do incidente seriam mostradas aqui</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IncidentCard;
