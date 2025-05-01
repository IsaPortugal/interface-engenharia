
import { useState } from 'react';
import { Cliente } from '@/types/obras';
import { toast } from '@/hooks/use-toast';

export function useClienteOperations(initialClientes: Cliente[]) {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNovoClienteOpen, setIsNovoClienteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get selected client
  const selectedCliente = clientes.find(cliente => cliente.id === selectedClienteId);

  // Filter clients based on search term
  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // View client details
  const handleViewCliente = (id: number) => {
    setSelectedClienteId(id);
    setIsViewDialogOpen(true);
  };

  // Open edit dialog
  const handleEditCliente = (id: number) => {
    setSelectedClienteId(id);
    setIsEditDialogOpen(true);
  };

  // Save new client
  const handleSaveCliente = (data: Omit<Cliente, 'id'>) => {
    const novoCliente: Cliente = {
      id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
      ...data,
    };
    
    setClientes([...clientes, novoCliente]);
    setIsNovoClienteOpen(false);
    toast({
      title: "Cliente cadastrado com sucesso!",
      description: `O cliente ${data.nome} foi adicionado.`,
    });
  };

  // Update client
  const handleUpdateCliente = (data: Omit<Cliente, 'id'>) => {
    if (selectedClienteId) {
      setClientes(prevClientes => 
        prevClientes.map(cliente => 
          cliente.id === selectedClienteId 
            ? { ...cliente, ...data }
            : cliente
        )
      );
      setIsEditDialogOpen(false);
      toast({
        title: "Cliente atualizado",
        description: `As informações de ${data.nome} foram atualizadas com sucesso.`,
      });
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (id: number) => {
    setSelectedClienteId(id);
    setIsDeleteDialogOpen(true);
  };

  // Confirm client deletion
  const confirmDeleteCliente = () => {
    if (selectedClienteId) {
      const clienteToDelete = clientes.find(cliente => cliente.id === selectedClienteId);
      setClientes(clientes.filter(cliente => cliente.id !== selectedClienteId));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Cliente excluído",
        description: `${clienteToDelete?.nome} foi removido com sucesso.`,
      });
    }
  };

  return {
    clientes,
    filteredClientes,
    selectedCliente,
    selectedClienteId,
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
  };
}
