
import { useState } from 'react';
import { Obra, Cliente } from '@/types/obras';
import { toast } from "@/hooks/use-toast";

export function useObrasOperations(initialObras: Obra[], initialClientes: Cliente[]) {
  const [obras, setObras] = useState<Obra[]>(initialObras);
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [deleteObraId, setDeleteObraId] = useState<number | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNovaObraOpen, setIsNovaObraOpen] = useState(false);

  const handleSaveObra = (obraData: Omit<Obra, 'id'>, clienteData: Omit<Cliente, 'id'>) => {
    // First save/update the cliente
    let clienteId: number;
    
    // Check if we're editing an existing obra with existing cliente
    if (selectedObra && selectedCliente) {
      // Update existing cliente
      const updatedCliente = {
        ...selectedCliente,
        ...clienteData
      };
      
      clienteId = updatedCliente.id;
      setClientes(clientes.map(c => c.id === clienteId ? updatedCliente : c));
    } else {
      // Create new cliente
      const novoCliente: Cliente = {
        id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
        ...clienteData,
      };
      
      clienteId = novoCliente.id;
      setClientes([...clientes, novoCliente]);
    }
    
    // Then save/update the obra with the correct cliente id
    if (selectedObra) {
      // Update existing obra
      const updatedObra = {
        ...selectedObra,
        ...obraData,
        cliente: clienteId
      };
      
      setObras(obras.map(o => o.id === selectedObra.id ? updatedObra : o));
      
      toast({
        title: "Obra atualizada com sucesso!",
        description: `A obra ${updatedObra.nome} foi atualizada.`,
      });
      
      setEditDialogOpen(false);
      setSelectedObra(null);
      setSelectedCliente(null);
    } else {
      // Create new obra
      const novaObra: Obra = {
        id: obras.length > 0 ? Math.max(...obras.map(o => o.id)) + 1 : 1,
        ...obraData,
        cliente: clienteId
      };
      
      setObras([...obras, novaObra]);
      
      toast({
        title: "Obra cadastrada com sucesso!",
        description: `A obra ${novaObra.nome} foi adicionada.`,
      });
      
      setIsNovaObraOpen(false);
    }
  };

  const handleViewDetails = (id: number) => {
    const obra = obras.find(obra => obra.id === id);
    if (obra) {
      const cliente = clientes.find(cliente => cliente.id === obra.cliente);
      setSelectedObra(obra);
      setSelectedCliente(cliente || null);
      setViewDialogOpen(true);
    }
  };

  const handleEditObra = (id: number) => {
    const obra = obras.find(obra => obra.id === id);
    if (obra) {
      const cliente = clientes.find(cliente => cliente.id === obra.cliente);
      setSelectedObra(obra);
      setSelectedCliente(cliente || null);
      setEditDialogOpen(true);
      
      toast({
        title: "Editar obra",
        description: `Editando obra: ${obra.nome}`,
      });
    }
  };

  const handleDeleteObra = (id: number) => {
    setDeleteObraId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteObra = () => {
    if (deleteObraId) {
      const obraToDelete = obras.find(obra => obra.id === deleteObraId);
      setObras(obras.filter(obra => obra.id !== deleteObraId));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Obra excluída com sucesso!",
        description: `A obra ${obraToDelete?.nome} foi removida.`,
      });
    }
  };

  return {
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
  };
}
