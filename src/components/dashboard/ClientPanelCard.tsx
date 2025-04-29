
import React from 'react';
import { User, Phone, Mail, Building, Eye, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { clientesData } from '@/data/obrasData';
import { toast } from 'sonner';

const ClientPanelCard = () => {
  const navigate = useNavigate();
  
  // Get only first 5 clients for a preview
  const previewClientes = clientesData.slice(0, 5);

  const handleViewClient = (id: number) => {
    toast.info("Visualizando detalhes do cliente");
    // In a real app, you might navigate to a client detail page
    // navigate(`/clientes/${id}`);
  };

  const handleEditClient = (id: number) => {
    toast.info("Editando cliente");
    // navigate(`/clientes/edit/${id}`);
  };

  const handleDeleteClient = (id: number) => {
    toast.success("Cliente excluído com sucesso");
  };

  const handleViewAllClients = () => {
    navigate('/clientes');
  };

  return (
    <Card className="shadow-md mb-6 border-none">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Painel de Clientes</CardTitle>
            <CardDescription>Visualize e gerencie seus clientes</CardDescription>
          </div>
          <Button variant="outline" onClick={handleViewAllClients}>Ver todos os clientes</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Obras</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewClientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">{cliente.nome}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {cliente.tipo === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                  </Badge>
                </TableCell>
                <TableCell>{cliente.documento}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-muted-foreground" /> {cliente.telefone}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    <Building className="h-3 w-3 mr-1" /> 2 obras
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleViewClient(cliente.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEditClient(cliente.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClient(cliente.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientPanelCard;
