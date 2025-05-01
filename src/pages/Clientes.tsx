
import React, { useState } from 'react';
import { User, Phone, Mail, FileText, Eye, Pencil, Trash2, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { clientesData as initialClientes } from '@/data/obrasData';
import { Cliente } from '@/types/obras';
import NovoClienteForm from '@/components/obras/NovoClienteForm';
import NovoClienteDialog from '@/components/obras/NovoClienteDialog';
import EditClienteDialog from '@/components/obras/EditClienteDialog';
import ClienteViewDialog from '@/components/obras/ClienteViewDialog';

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNovoClienteOpen, setIsNovoClienteOpen] = useState(false);

  // Filter clients based on search term
  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find selected client
  const selectedCliente = clientes.find(cliente => cliente.id === selectedClienteId);

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

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <User className="mr-2 h-6 w-6 text-primary" />
            Clientes
          </h1>
          <p className="text-muted-foreground">Gerencie os clientes cadastrados no sistema</p>
        </div>
        
        <Button onClick={() => setIsNovoClienteOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> 
          Novo Cliente
        </Button>
      </div>

      {/* Add search field */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar clientes por nome, documento, email ou telefone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map(cliente => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {cliente.tipo === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                    </Badge>
                  </TableCell>
                  <TableCell>{cliente.documento}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewCliente(cliente.id)}>
                        <Eye className="h-4 w-4 mr-1" /> Visualizar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditCliente(cliente.id)}>
                        <Pencil className="h-4 w-4 mr-1" /> Editar
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteClick(cliente.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
                    <h3 className="font-medium text-lg">Nenhum cliente encontrado</h3>
                    <p className="text-muted-foreground">
                      Tente ajustar sua busca ou adicione um novo cliente.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
