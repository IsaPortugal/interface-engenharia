
import { useState } from 'react';
import { Obra, Cliente } from '@/types/obras';
import { toast } from "@/hooks/use-toast";

export function useObrasOperations(initialObras: Obra[], initialClientes: Cliente[]) {
  const [obras, setObras] = useState<Obra[]>(initialObras);
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
  const [deleteObraId, setDeleteObraId] = useState<number | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSaveObra = (data: Omit<Obra, 'id'>) => {
    const novaObra: Obra = {
      id: obras.length > 0 ? Math.max(...obras.map(o => o.id)) + 1 : 1,
      ...data,
    };
    
    setObras([...obras, novaObra]);
    toast({
      title: "Obra cadastrada com sucesso!",
      description: `A obra ${novaObra.nome} foi adicionada.`,
    });
    
    return novaObra;
  };

  const handleSaveCliente = (data: Omit<Cliente, 'id'>) => {
    const novoCliente: Cliente = {
      id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
      ...data,
    };
    
    setClientes([...clientes, novoCliente]);
    toast({
      title: "Cliente cadastrado com sucesso!",
      description: `O cliente ${novoCliente.nome} foi adicionado.`,
    });
    
    return novoCliente;
  };

  const handleViewDetails = (id: number) => {
    const obra = obras.find(obra => obra.id === id);
    if (obra) {
      setSelectedObra(obra);
      setViewDialogOpen(true);
    }
  };

  const handleEditObra = (id: number) => {
    const obra = obras.find(obra => obra.id === id);
    if (obra) {
      setSelectedObra(obra);
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
  };
}
