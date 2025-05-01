
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { clientesData as initialClientes } from '@/data/obrasData';
import { useClienteOperations } from '@/hooks/useClienteOperations';
import ClientesHeader from '@/components/clientes/ClientesHeader';
import ClientesSearchField from '@/components/clientes/ClientesSearchField';
import ClientesTable from '@/components/clientes/ClientesTable';
import NovoClienteDialog from '@/components/obras/NovoClienteDialog';
import EditClienteDialog from '@/components/obras/EditClienteDialog';
import ClienteViewDialog from '@/components/obras/ClienteViewDialog';

const Clientes = () => {
  const {
    filteredClientes,
    selectedCliente,
    searchTerm,
    isViewDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    isNovoClienteOpen,
    setSearchTerm,
    setIsViewDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    setIsNovoClienteOpen,
    handleViewCliente,
    handleEditCliente,
    handleSaveCliente,
    handleUpdateCliente,
    handleDeleteClick,
    confirmDeleteCliente,
  } = useClienteOperations(initialClientes);

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <ClientesHeader onNovoCliente={() => setIsNovoClienteOpen(true)} />
      <ClientesSearchField searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ClientesTable 
        clientes={filteredClientes}
        onViewCliente={handleViewCliente}
        onEditCliente={handleEditCliente}
        onDeleteCliente={handleDeleteClick}
      />

      {/* Novo Cliente Dialog */}
      <NovoClienteDialog 
        isOpen={isNovoClienteOpen}
        onOpenChange={setIsNovoClienteOpen}
        onSave={handleSaveCliente}
      />

      {/* View Client Dialog */}
      <ClienteViewDialog
        cliente={selectedCliente}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />

      {/* Edit Client Dialog */}
      <EditClienteDialog
        cliente={selectedCliente}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleUpdateCliente}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteCliente} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Clientes;
