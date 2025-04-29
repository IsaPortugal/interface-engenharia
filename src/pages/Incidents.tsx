
import React, { useState } from 'react';
import { AlertTriangle, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// Import our components
import IncidentCard from '@/components/incidents/IncidentCard';
import IncidentForm from '@/components/incidents/IncidentForm';
import { incidentsData } from '@/components/incidents/IncidentsData';

const Incidents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredIncidents = incidentsData.filter(incident => 
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container max-w-6xl mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-orange-500" />
            Incidentes
          </h1>
          <p className="text-muted-foreground">Gerencie os incidentes reportados nas obras</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" /> 
              Registrar Incidente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <IncidentForm onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar incidentes por título ou projeto..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="open">Em aberto</TabsTrigger>
          <TabsTrigger value="resolved">Resolvidos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map(incident => (
                <IncidentCard key={incident.id} incident={incident} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
                <h3 className="font-medium text-lg">Nenhum incidente encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou registre um novo incidente.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="open">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIncidents
              .filter(incident => incident.status === 'Em aberto')
              .map(incident => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIncidents
              .filter(incident => incident.status === 'Resolvido')
              .map(incident => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Incidents;
