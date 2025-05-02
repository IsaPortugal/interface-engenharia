
import React, { useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Cliente } from '@/types/obras';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';

interface ClientesTableProps {
  clientes: Cliente[];
  onViewCliente: (id: number) => void;
  onEditCliente: (id: number) => void;
  onDeleteCliente: (id: number) => void;
}

const ClientesTable = ({ 
  clientes, 
  onViewCliente, 
  onEditCliente, 
  onDeleteCliente 
}: ClientesTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setClienteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clienteToDelete !== null) {
      onDeleteCliente(clienteToDelete);
      setDeleteDialogOpen(false);
      setClienteToDelete(null);
    }
  };

  return (
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
          {clientes.length > 0 ? (
            clientes.map(cliente => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">{cliente.nome}</TableCell>
                <TableCell>
                  {cliente.tipo === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                </TableCell>
                <TableCell>{cliente.documento}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => onViewCliente(cliente.id)}>
                      Detalhes
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onEditCliente(cliente.id)}>
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteClick(cliente.id)}>
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
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
      
      <DeleteConfirmationDialog 
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ClientesTable;
