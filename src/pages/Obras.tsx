
import React, { useState } from 'react';
import { Building } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ObraCard from '@/components/obras/ObraCard';
import ObraFilters from '@/components/obras/ObraFilters';
import EmptyObras from '@/components/obras/EmptyObras';
import NovaObraDialog from '@/components/obras/NovaObraDialog';
import NovoClienteDialog from '@/components/obras/NovoClienteDialog';
import { obrasData as initialObras, clientesData as initialClientes } from '@/data/obrasData';
import { Obra, Cliente } from '@/types/obras';
import { toast } from "@/hooks/use-toast";

// Página principal de Obras
const Obras = () => {
  const [obras, setObras] = useState<Obra[]>(initialObras);
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNovaObraOpen, setIsNovaObraOpen] = useState(false);
  const [isNovoClienteOpen, setIsNovoClienteOpen] = useState(false);

  // Filtrar obras com base no termo de busca
  const filteredObras = obras.filter(obra => 
    obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manipuladores de eventos
  const handleSaveObra = (data: Omit<Obra, 'id'>) => {
    const novaObra: Obra = {
      id: obras.length > 0 ? Math.max(...obras.map(o => o.id)) + 1 : 1,
      ...data,
    };
    
    setObras([...obras, novaObra]);
    setIsNovaObraOpen(false);
    toast({
      title: "Obra cadastrada com sucesso!",
      description: `A obra ${novaObra.nome} foi adicionada.`,
    });
  };

  const handleSaveCliente = (data: Omit<Cliente, 'id'>) => {
    const novoCliente: Cliente = {
      id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
      ...data,
    };
    
    setClientes([...clientes, novoCliente]);
    setIsNovoClienteOpen(false);
    toast({
      title: "Cliente cadastrado com sucesso!",
      description: `O cliente ${novoCliente.nome} foi adicionado.`,
    });
  };

  const handleOpenNovoCliente = () => {
    setIsNovaObraOpen(false);
    setIsNovoClienteOpen(true);
  };

  const handleViewDetails = (id: number) => {
    // Aqui você pode implementar a navegação para a página de detalhes da obra
    console.log("Ver detalhes da obra ID:", id);
    toast({
      title: "Visualizando detalhes",
      description: `Detalhes da obra ID: ${id}`,
    });
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredObras.length > 0 ? (
              filteredObras.map(obra => (
                <ObraCard key={obra.id} obra={obra} onViewDetails={handleViewDetails} />
              ))
            ) : (
              <EmptyObras />
            )}
          </div>
        </TabsContent>

        <TabsContent value="ongoing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredObras
              .filter(obra => obra.status === 'Em andamento')
              .map(obra => (
                <ObraCard key={obra.id} obra={obra} onViewDetails={handleViewDetails} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredObras
              .filter(obra => obra.status === 'Concluído')
              .map(obra => (
                <ObraCard key={obra.id} obra={obra} onViewDetails={handleViewDetails} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Obras;
