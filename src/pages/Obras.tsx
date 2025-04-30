
import React, { useState } from 'react';
import { Building } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ObraFilters from '@/components/obras/ObraFilters';
import NovaObraDialog from '@/components/obras/NovaObraDialog';
import NovoClienteDialog from '@/components/obras/NovoClienteDialog';
import ObrasTabContent from '@/components/obras/ObrasTabContent';
import ObraViewDialog from '@/components/obras/ObraViewDialog';
import DeleteObraDialog from '@/components/obras/DeleteObraDialog';
import { obrasData as initialObras, clientesData as initialClientes } from '@/data/obrasData';
import { useObrasOperations } from '@/hooks/useObrasOperations';

// Página principal de Obras
const Obras = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNovaObraOpen, setIsNovaObraOpen] = useState(false);
  const [isNovoClienteOpen, setIsNovoClienteOpen] = useState(false);
  
  const {
    obras,
    clientes,
    selectedObra,
    viewDialogOpen,
    editDialogOpen,
    isDeleteDialogOpen,
    setViewDialogOpen,
    setEditDialogOpen,
    setIsDeleteDialogOpen,
    handleSaveObra,
    handleSaveCliente,
    handleViewDetails,
    handleEditObra,
    handleDeleteObra,
    confirmDeleteObra,
  } = useObrasOperations(initialObras, initialClientes);

  // Filtrar obras com base no termo de busca
  const filteredObras = obras.filter(obra => 
    obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenNovoCliente = () => {
    setIsNovaObraOpen(false);
    setIsNovoClienteOpen(true);
  };

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
        
        {/* Dialogs para criar nova obra e novo cliente */}
        <NovaObraDialog 
          clientes={clientes}
          isOpen={isNovaObraOpen}
          onOpenChange={setIsNovaObraOpen}
          onSave={handleSaveObra}
          onNovoCliente={handleOpenNovoCliente}
        />

        <NovoClienteDialog 
          isOpen={isNovoClienteOpen}
          onOpenChange={setIsNovoClienteOpen}
          onSave={handleSaveCliente}
        />
      </div>

      <ObraFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="ongoing">Em andamento</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ObrasTabContent 
            obras={filteredObras}
            onViewDetails={handleViewDetails}
            onEdit={handleEditObra}
            onDelete={handleDeleteObra}
          />
        </TabsContent>

        <TabsContent value="ongoing">
          <ObrasTabContent 
            obras={filteredObras.filter(obra => obra.status === 'Em andamento')}
            onViewDetails={handleViewDetails}
            onEdit={handleEditObra}
            onDelete={handleDeleteObra}
          />
        </TabsContent>

        <TabsContent value="completed">
          <ObrasTabContent 
            obras={filteredObras.filter(obra => obra.status === 'Concluído')}
            onViewDetails={handleViewDetails}
            onEdit={handleEditObra}
            onDelete={handleDeleteObra}
          />
        </TabsContent>
      </Tabs>

      {/* View Obra Dialog */}
      <ObraViewDialog 
        obra={selectedObra}
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
