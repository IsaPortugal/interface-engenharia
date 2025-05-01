
import React, { useState } from 'react';
import { Building, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ObraFilters from '@/components/obras/ObraFilters';
import NovaObraDialog from '@/components/obras/NovaObraDialog';
import ObrasTabContent from '@/components/obras/ObrasTabContent';
import ObraViewDialog from '@/components/obras/ObraViewDialog';
import DeleteObraDialog from '@/components/obras/DeleteObraDialog';
import { obrasData as initialObras, clientesData as initialClientes } from '@/data/obrasData';
import { useObrasOperations } from '@/hooks/useObrasOperations';

// Página principal de Obras
const Obras = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    obras,
    clientes,
    selectedObra,
    selectedCliente,
    viewDialogOpen,
    editDialogOpen,
    isDeleteDialogOpen,
    isNovaObraOpen,
    setViewDialogOpen,
    setEditDialogOpen,
    setIsDeleteDialogOpen,
    setIsNovaObraOpen,
    handleSaveObra,
    handleViewDetails,
    handleEditObra,
    handleDeleteObra,
    confirmDeleteObra,
  } = useObrasOperations(initialObras, initialClientes);

  // Filtrar obras com base no termo de busca apenas
  const filteredObras = obras
    .filter(obra => 
      obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id); // Ordenar por ID (ordem de cadastro)

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Building className="mr-2 h-6 w-6 text-primary" />
            Obras
          </h1>
          <p className="text-muted-foreground">Gerencie e monitore todas as obras em andamento</p>
        </div>
        
        <Button onClick={() => setIsNovaObraOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> 
          Nova Obra
        </Button>
      </div>

      <ObraFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="ongoing">Em andamento</TabsTrigger>
          <TabsTrigger value="delayed">Atrasado</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ObrasTabContent 
            filteredObras={filteredObras}
            handleViewObra={handleViewDetails}
            handleEditObra={handleEditObra}
            handleDeleteObra={handleDeleteObra}
          />
        </TabsContent>

        <TabsContent value="ongoing">
          <ObrasTabContent 
            filteredObras={filteredObras.filter(obra => obra.status === "Em andamento")}
            handleViewObra={handleViewDetails}
            handleEditObra={handleEditObra}
            handleDeleteObra={handleDeleteObra}
          />
        </TabsContent>

        <TabsContent value="delayed">
          <ObrasTabContent 
            filteredObras={filteredObras.filter(obra => obra.status === "Atrasado")}
            handleViewObra={handleViewDetails}
            handleEditObra={handleEditObra}
            handleDeleteObra={handleDeleteObra}
          />
        </TabsContent>

        <TabsContent value="completed">
          <ObrasTabContent 
            filteredObras={filteredObras.filter(obra => obra.status === "Concluído")}
            handleViewObra={handleViewDetails}
            handleEditObra={handleEditObra}
            handleDeleteObra={handleDeleteObra}
          />
        </TabsContent>
      </Tabs>

      {/* Nova Obra Dialog */}
      <NovaObraDialog 
        isOpen={isNovaObraOpen}
        onOpenChange={setIsNovaObraOpen}
        onSave={handleSaveObra}
        clientes={clientes}
      />

      {/* Edit Obra Dialog */}
      <NovaObraDialog 
        obra={selectedObra}
        cliente={selectedCliente}
        clientes={clientes}
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveObra}
        isEdit={true}
      />

      {/* View Obra Dialog */}
      <ObraViewDialog 
        obra={selectedObra}
        cliente={selectedCliente}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      {/* Delete confirmation dialog */}
      <DeleteObraDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteObra}
      />
    </div>
  );
};

export default Obras;
