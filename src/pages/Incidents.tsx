
import React, { useState } from 'react';
import { AlertTriangle, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from "sonner";

// Import our components
import IncidentCard from '@/components/incidents/IncidentCard';
import IncidentForm from '@/components/incidents/IncidentForm';
import { incidentsData } from '@/components/incidents/IncidentsData';

const Incidents = () => {
  const [incidents, setIncidents] = useState(incidentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const filteredIncidents = incidents.filter(incident => 
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view incident details
  const handleViewIncident = (incident) => {
    setSelectedIncident(incident);
    setViewDialogOpen(true);
  };

  // Handle edit incident
  const handleEditIncident = (incident) => {
    setSelectedIncident(incident);
    setEditDialogOpen(true);
  };

  // Handle delete incident
  const handleDeleteIncident = (incident) => {
    toast.success(`Incidente "${incident.title}" excluído com sucesso.`);
    setIncidents(incidents.filter(item => item.id !== incident.id));
  };

  return (
    <div className="container max-w-6xl mx-auto py-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
            Incidentes
          </h1>
          <p className="text-sm text-muted-foreground">Gerencie os incidentes reportados nas obras</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white text-sm px-3 py-1 h-auto">
              <Plus className="mr-1 h-3.5 w-3.5" /> 
              Registrar Incidente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <IncidentForm onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
            <Input
              placeholder="Buscar incidentes por título ou projeto..."
              className="pl-8 h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-3 h-8">
          <TabsTrigger value="all" className="text-xs h-7">Todos</TabsTrigger>
          <TabsTrigger value="open" className="text-xs h-7">Em aberto</TabsTrigger>
          <TabsTrigger value="resolved" className="text-xs h-7">Resolvidos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map(incident => (
                <IncidentCard 
                  key={incident.id} 
                  incident={incident}
                  onView={() => handleViewIncident(incident)}
                  onEdit={() => handleEditIncident(incident)}
                  onDelete={() => handleDeleteIncident(incident)}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-8">
                <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2 opacity-40" />
                <h3 className="font-medium text-base">Nenhum incidente encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar sua busca ou registre um novo incidente.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="open">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredIncidents
              .filter(incident => incident.status === 'Em aberto')
              .map(incident => (
                <IncidentCard 
                  key={incident.id} 
                  incident={incident} 
                  onView={() => handleViewIncident(incident)}
                  onEdit={() => handleEditIncident(incident)}
                  onDelete={() => handleDeleteIncident(incident)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredIncidents
              .filter(incident => incident.status === 'Resolvido')
              .map(incident => (
                <IncidentCard 
                  key={incident.id} 
                  incident={incident} 
                  onView={() => handleViewIncident(incident)}
                  onEdit={() => handleEditIncident(incident)}
                  onDelete={() => handleDeleteIncident(incident)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* View Incident Dialog */}
      {selectedIncident && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="text-lg">{selectedIncident.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 py-3">
              <div className="grid gap-1">
                <h3 className="font-medium text-sm">Projeto</h3>
                <p className="text-sm">{selectedIncident.project}</p>
              </div>
              <div className="grid gap-1">
                <h3 className="font-medium text-sm">Status</h3>
                <p className="text-sm">{selectedIncident.status}</p>
              </div>
              <div className="grid gap-1">
                <h3 className="font-medium text-sm">Data</h3>
                <p className="text-sm">{selectedIncident.date}</p>
              </div>
              <div className="grid gap-1">
                <h3 className="font-medium text-sm">Responsável</h3>
                <p className="text-sm">{selectedIncident.assignedTo}</p>
              </div>
              <div className="grid gap-1">
                <h3 className="font-medium text-sm">Descrição</h3>
                <p className="text-sm">{selectedIncident.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Edit Incident Dialog */}
      {selectedIncident && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <IncidentForm 
              incident={selectedIncident}
              onClose={() => setEditDialogOpen(false)}
              isEdit={true}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Incidents;
