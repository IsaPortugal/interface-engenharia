
import React, { useState } from 'react';
import { Building, Filter, Calendar, Search, Plus, MapPin, HardHat, Users, Trash2, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Dados de exemplo para projetos de obra
const obrasData = [
  {
    id: 1,
    nome: 'Edifício Residencial Aurora',
    endereco: 'Av. Paulista, 1000, São Paulo',
    responsavel: 'EF',
    inicio: '10/01/2023',
    prazo: '15/12/2023',
    tipo: 'Residencial',
    progresso: 75,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
    cliente: {
      id: 1,
      nome: 'Construtora Horizonte',
      tipo: 'Pessoa Jurídica',
      documento: '12.345.678/0001-90',
      email: 'contato@horizonte.com',
      telefone: '(11) 3456-7890'
    }
  },
  {
    id: 2,
    nome: 'Centro Comercial Vitória',
    endereco: 'Rua das Flores, 500, Florianópolis',
    responsavel: 'RS',
    inicio: '05/03/2023',
    prazo: '25/02/2024',
    tipo: 'Comercial',
    progresso: 45,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=2670&auto=format&fit=crop',
    cliente: {
      id: 2,
      nome: 'Empreendimentos RS',
      tipo: 'Pessoa Jurídica',
      documento: '98.765.432/0001-10',
      email: 'contato@emprs.com',
      telefone: '(48) 3456-7890'
    }
  },
  {
    id: 3,
    nome: 'Hospital São Lucas',
    endereco: 'Av. Brasil, 2000, Rio de Janeiro',
    responsavel: 'TC',
    inicio: '20/05/2023',
    prazo: '30/06/2024',
    tipo: 'Saúde',
    progresso: 30,
    status: 'Em andamento',
    imagem: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=2671&auto=format&fit=crop',
    cliente: {
      id: 3,
      nome: 'Fundação Saúde e Vida',
      tipo: 'Pessoa Jurídica',
      documento: '45.678.901/0001-23',
      email: 'contato@fsv.org',
      telefone: '(21) 3456-7890'
    }
  },
  {
    id: 4,
    nome: 'Condomínio Park Avenue',
    endereco: 'Rua João Paulo, 350, Curitiba',
    responsavel: 'MF',
    inicio: '15/07/2022',
    prazo: '10/08/2023',
    tipo: 'Residencial',
    progresso: 100,
    status: 'Concluído',
    imagem: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2670&auto=format&fit=crop',
    cliente: {
      id: 4,
      nome: 'Construtora ABC',
      tipo: 'Pessoa Jurídica',
      documento: '34.567.890/0001-45',
      email: 'contato@abc.com',
      telefone: '(41) 3456-7890'
    }
  }
];

// Dados de exemplo para clientes
const clientesData = [
  {
    id: 1,
    nome: 'Construtora Horizonte',
    tipo: 'Pessoa Jurídica',
    documento: '12.345.678/0001-90',
    email: 'contato@horizonte.com',
    telefone: '(11) 3456-7890'
  },
  {
    id: 2,
    nome: 'Empreendimentos RS',
    tipo: 'Pessoa Jurídica',
    documento: '98.765.432/0001-10',
    email: 'contato@emprs.com',
    telefone: '(48) 3456-7890'
  },
  {
    id: 3,
    nome: 'Fundação Saúde e Vida',
    tipo: 'Pessoa Jurídica',
    documento: '45.678.901/0001-23',
    email: 'contato@fsv.org',
    telefone: '(21) 3456-7890'
  },
  {
    id: 4,
    nome: 'Construtora ABC',
    tipo: 'Pessoa Jurídica',
    documento: '34.567.890/0001-45',
    email: 'contato@abc.com',
    telefone: '(41) 3456-7890'
  },
  {
    id: 5,
    nome: 'João da Silva',
    tipo: 'Pessoa Física',
    documento: '123.456.789-00',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321'
  }
];

// Componente para cartão de obra
const ObraCard = ({ obra, onEdit, onView, onDelete }) => {
  const statusColors = {
    'Em andamento': 'bg-blue-100 text-blue-800',
    'Concluído': 'bg-green-100 text-green-800',
    'Atrasado': 'bg-red-100 text-red-800',
    'Paralisado': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={obra.imagem} 
          alt={obra.nome}
          className="w-full h-full object-cover"
          onError={(e) => {
            const imgElement = e.target as HTMLImageElement;
            imgElement.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <Badge className={statusColors[obra.status]}>{obra.status}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{obra.nome}</CardTitle>
        <CardDescription className="flex items-center text-xs">
          <MapPin className="h-3 w-3 mr-1" /> {obra.endereco}
        </CardDescription>
        <CardDescription className="flex items-center text-xs mt-1">
          <Users className="h-3 w-3 mr-1" /> Cliente: {obra.cliente?.nome || "Não definido"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Progresso:</span>
            <span>{obra.progresso}%</span>
          </div>
          <Progress value={obra.progresso} className="h-2" />
          
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <p className="font-semibold">Início:</p>
              <p>{obra.inicio}</p>
            </div>
            <div>
              <p className="font-semibold">Prazo:</p>
              <p>{obra.prazo}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs">{obra.responsavel}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">Responsável</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="p-0 h-7 w-7" onClick={() => onEdit(obra)}>
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="outline" className="p-0 h-7 w-7" onClick={() => onView(obra)}>
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="outline" className="p-0 h-7 w-7 text-red-500 hover:text-red-700" onClick={() => onDelete(obra)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Validação do formulário de obra
const obraSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  endereco: z.string().min(5, "Endereço é obrigatório"),
  clienteId: z.string().optional(),
  inicio: z.string().min(1, "Data de início é obrigatória"),
  prazo: z.string().min(1, "Prazo é obrigatório"),
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  novoCliente: z.boolean().optional(),
  novoClienteNome: z.string().optional(),
  novoClienteTipo: z.string().optional(),
  novoClienteDocumento: z.string().optional(),
  novoClienteEmail: z.string().email("E-mail inválido").optional(),
  novoClienteTelefone: z.string().optional(),
});

// Validação do formulário de cliente
const clienteSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  tipo: z.enum(["Pessoa Física", "Pessoa Jurídica"]),
  documento: z.string().min(1, "Documento é obrigatório"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
});

// Formulário para cadastro/edição de obra
const ObraForm = ({ obra, clientes, onClose, onSave }) => {
  const [novoCliente, setNovoCliente] = useState(false);
  const [clienteTipo, setClienteTipo] = useState("Pessoa Jurídica");
  
  const form = useForm({
    resolver: zodResolver(obraSchema),
    defaultValues: {
      nome: obra?.nome || "",
      endereco: obra?.endereco || "",
      clienteId: obra?.cliente?.id?.toString() || "",
      inicio: obra?.inicio || "",
      prazo: obra?.prazo || "",
      responsavel: obra?.responsavel || "",
      novoCliente: false,
      novoClienteNome: "",
      novoClienteTipo: "Pessoa Jurídica",
      novoClienteDocumento: "",
      novoClienteEmail: "",
      novoClienteTelefone: "",
    },
  });

  const handleClienteTipoChange = (value) => {
    setClienteTipo(value);
  };

  const handleSubmit = (data) => {
    onSave(data);
    onClose();
    toast.success(obra ? "Obra atualizada com sucesso!" : "Nova obra cadastrada com sucesso!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader className="text-center">
          <DialogTitle>{obra ? "Editar Obra" : "Nova Obra"}</DialogTitle>
          <DialogDescription>
            {obra 
              ? "Edite os detalhes da obra existente" 
              : "Preencha os campos para cadastrar uma nova obra"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Obra</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Edifício Residencial Aurora" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Av. Paulista, 1000, São Paulo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Cliente</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setNovoCliente(!novoCliente);
                  form.setValue("novoCliente", !novoCliente);
                }}
              >
                {novoCliente ? "Selecionar Existente" : "Novo Cliente"}
              </Button>
            </div>

            {!novoCliente ? (
              <FormField
                control={form.control}
                name="clienteId"
                render={({ field }) => (
                  <FormItem>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clientes.map(cliente => (
                          <SelectItem key={cliente.id} value={cliente.id.toString()}>
                            {cliente.nome} ({cliente.tipo})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                <FormField
                  control={form.control}
                  name="novoClienteNome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Construtora Horizonte" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="novoClienteTipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Cliente</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleClienteTipoChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pessoa Jurídica">Pessoa Jurídica</SelectItem>
                          <SelectItem value="Pessoa Física">Pessoa Física</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="novoClienteDocumento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {clienteTipo === "Pessoa Jurídica" ? "CNPJ" : "CPF"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={
                            clienteTipo === "Pessoa Jurídica" 
                              ? "Ex: 12.345.678/0001-90" 
                              : "Ex: 123.456.789-00"
                          }
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="novoClienteEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail de Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: contato@empresa.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="novoClienteTelefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone de Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: (11) 3456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="inicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Início</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="prazo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Est. de Término</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="responsavel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsável pela Obra</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EF">Eng. Fiscal (EF)</SelectItem>
                    <SelectItem value="RS">Roberto Silva (RS)</SelectItem>
                    <SelectItem value="TC">Técnico Carlos (TC)</SelectItem>
                    <SelectItem value="MF">Maria Fernandes (MF)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <Label>Imagens de Progresso (opcional)</Label>
            <div className="mt-2 border-2 border-dashed rounded-md p-6 text-center">
              <Input 
                type="file" 
                multiple 
                className="hidden" 
                id="image-upload"
              />
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <Plus className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium">Clique para fazer upload</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Arraste e solte imagens ou clique para selecionar
                  </span>
                </div>
              </Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {obra ? "Salvar Alterações" : "Cadastrar Obra"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

// Formulário para cadastro/edição de cliente
const ClienteForm = ({ cliente, onClose, onSave }) => {
  const [tipoCliente, setTipoCliente] = useState(cliente?.tipo || "Pessoa Jurídica");
  
  const form = useForm({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: cliente?.nome || "",
      tipo: cliente?.tipo || "Pessoa Jurídica",
      documento: cliente?.documento || "",
      email: cliente?.email || "",
      telefone: cliente?.telefone || "",
    },
  });

  const handleTipoChange = (value) => {
    setTipoCliente(value);
  };

  const handleSubmit = (data) => {
    onSave(data);
    onClose();
    toast.success(cliente ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader className="text-center">
          <DialogTitle>{cliente ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
          <DialogDescription>
            {cliente 
              ? "Edite os detalhes do cliente existente" 
              : "Preencha os campos para cadastrar um novo cliente"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Construtora Horizonte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Cliente</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleTipoChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pessoa Jurídica">Pessoa Jurídica</SelectItem>
                    <SelectItem value="Pessoa Física">Pessoa Física</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="documento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tipoCliente === "Pessoa Jurídica" ? "CNPJ" : "CPF"}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={
                      tipoCliente === "Pessoa Jurídica" 
                        ? "Ex: 12.345.678/0001-90" 
                        : "Ex: 123.456.789-00"
                    }
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail de Contato</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: contato@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone de Contato</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: (11) 3456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {cliente ? "Salvar Alterações" : "Cadastrar Cliente"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

// Componente para visualização de detalhes da obra
const ObraDetails = ({ obra, onClose }) => {
  const [activeTab, setActiveTab] = useState("info");
  
  return (
    <>
      <DialogHeader className="text-center">
        <DialogTitle>{obra.nome}</DialogTitle>
        <DialogDescription>
          Detalhes completos da obra
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
          <TabsTrigger value="imagens">Progresso</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Status</Label>
              <p className="font-medium">{obra.status}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Progresso</Label>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={obra.progresso} className="h-2 flex-1" />
                <span className="text-sm font-medium">{obra.progresso}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-muted-foreground">Localização</Label>
            <p className="font-medium">{obra.endereco}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Data de Início</Label>
              <p className="font-medium">{obra.inicio}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Prazo de Conclusão</Label>
              <p className="font-medium">{obra.prazo}</p>
            </div>
          </div>
          
          <div>
            <Label className="text-muted-foreground">Responsável</Label>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">{obra.responsavel}</AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {obra.responsavel === "EF" ? "Eng. Fiscal" : 
                 obra.responsavel === "RS" ? "Roberto Silva" :
                 obra.responsavel === "TC" ? "Técnico Carlos" :
                 obra.responsavel === "MF" ? "Maria Fernandes" : obra.responsavel}
              </span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="cliente" className="space-y-4">
          {obra.cliente ? (
            <>
              <div>
                <Label className="text-muted-foreground">Nome</Label>
                <p className="font-medium">{obra.cliente.nome}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Tipo</Label>
                  <p className="font-medium">{obra.cliente.tipo}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    {obra.cliente.tipo === "Pessoa Jurídica" ? "CNPJ" : "CPF"}
                  </Label>
                  <p className="font-medium">{obra.cliente.documento}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">E-mail</Label>
                  <p className="font-medium">{obra.cliente.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Telefone</Label>
                  <p className="font-medium">{obra.cliente.telefone}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-40 mb-3" />
              <h3 className="font-medium text-lg">Nenhum cliente vinculado</h3>
              <p className="text-muted-foreground">
                Esta obra não possui um cliente vinculado.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="imagens" className="space-y-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Aqui serão exibidas as imagens de progresso da obra.
            </p>
            <Button className="mt-4" variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Imagens
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <DialogFooter>
        <Button onClick={onClose}>Fechar</Button>
      </DialogFooter>
    </>
  );
};

// Componente para lista de clientes
const ClientesList = ({ clientes, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar clientes por nome, documento ou e-mail..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Nome</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Tipo</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Documento</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">E-mail</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Telefone</th>
              <th className="text-center p-3 text-xs font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-muted/30">
                  <td className="p-3">{cliente.nome}</td>
                  <td className="p-3">{cliente.tipo}</td>
                  <td className="p-3">{cliente.documento}</td>
                  <td className="p-3">{cliente.email}</td>
                  <td className="p-3">{cliente.telefone}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" className="p-0 h-7 w-7" onClick={() => onEdit(cliente)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-0 h-7 w-7 text-red-500 hover:text-red-700" onClick={() => onDelete(cliente)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-40 mb-3" />
                  <h3 className="font-medium text-lg">Nenhum cliente encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar sua busca ou cadastre um novo cliente.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Página principal de Obras
const Obras = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [obras, setObras] = useState(obrasData);
  const [clientes, setClientes] = useState(clientesData);
  
  const [dialogContent, setDialogContent] = useState<{ type: string, data: any } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Manipuladores para diálogos
  const openDialog = (type, data = null) => {
    setDialogContent({ type, data });
    setDialogOpen(true);
  };
  
  const closeDialog = () => {
    setDialogOpen(false);
    setTimeout(() => setDialogContent(null), 300);
  };
  
  // Manipuladores para obras
  const handleCreateObra = (data) => {
    const newId = obras.length > 0 ? Math.max(...obras.map(o => o.id)) + 1 : 1;
    
    let clienteObj = null;
    
    if (data.novoCliente && data.novoClienteNome) {
      const newClienteId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
      const newCliente = {
        id: newClienteId,
        nome: data.novoClienteNome,
        tipo: data.novoClienteTipo,
        documento: data.novoClienteDocumento || "",
        email: data.novoClienteEmail || "",
        telefone: data.novoClienteTelefone || "",
      };
      
      setClientes(prev => [...prev, newCliente]);
      clienteObj = newCliente;
    } else if (data.clienteId) {
      clienteObj = clientes.find(c => c.id.toString() === data.clienteId);
    }
    
    const newObra = {
      id: newId,
      nome: data.nome,
      endereco: data.endereco,
      responsavel: data.responsavel,
      inicio: data.inicio,
      prazo: data.prazo,
      tipo: "Residencial", // Padrão
      progresso: 0,
      status: "Em andamento",
      imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
      cliente: clienteObj,
    };
    
    setObras(prev => [...prev, newObra]);
  };
  
  const handleUpdateObra = (data) => {
    const updatedObras = obras.map(obra => {
      if (obra.id === dialogContent?.data?.id) {
        let clienteObj = obra.cliente;
        
        if (data.novoCliente && data.novoClienteNome) {
          const newClienteId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
          const newCliente = {
            id: newClienteId,
            nome: data.novoClienteNome,
            tipo: data.novoClienteTipo,
            documento: data.novoClienteDocumento || "",
            email: data.novoClienteEmail || "",
            telefone: data.novoClienteTelefone || "",
          };
          
          setClientes(prev => [...prev, newCliente]);
          clienteObj = newCliente;
        } else if (data.clienteId) {
          clienteObj = clientes.find(c => c.id.toString() === data.clienteId);
        }
        
        return {
          ...obra,
          nome: data.nome,
          endereco: data.endereco,
          responsavel: data.responsavel,
          inicio: data.inicio,
          prazo: data.prazo,
          cliente: clienteObj,
        };
      }
      return obra;
    });
    
    setObras(updatedObras);
  };
  
  const handleDeleteObra = (obra) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a obra "${obra.nome}"?`);
    if (confirmDelete) {
      setObras(prev => prev.filter(o => o.id !== obra.id));
      toast.success("Obra excluída com sucesso!");
    }
  };
  
  // Manipuladores para clientes
  const handleCreateCliente = (data) => {
    const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    const newCliente = {
      id: newId,
      ...data,
    };
    
    setClientes(prev => [...prev, newCliente]);
  };
  
  const handleUpdateCliente = (data) => {
    const updatedClientes = clientes.map(cliente => {
      if (cliente.id === dialogContent?.data?.id) {
        return {
          ...cliente,
          ...data,
        };
      }
      return cliente;
    });
    
    setClientes(updatedClientes);
    
    // Atualizar cliente nas obras também
    setObras(prev => prev.map(obra => {
      if (obra.cliente?.id === dialogContent?.data?.id) {
        return {
          ...obra,
          cliente: {
            ...obra.cliente,
            ...data,
          },
        };
      }
      return obra;
    }));
  };
  
  const handleDeleteCliente = (cliente) => {
    // Verificar se o cliente está vinculado a alguma obra
    const linkedObras = obras.filter(obra => obra.cliente?.id === cliente.id);
    if (linkedObras.length > 0) {
      toast.error(`Este cliente não pode ser excluído pois está vinculado a ${linkedObras.length} obra(s).`);
      return;
    }
    
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}"?`);
    if (confirmDelete) {
      setClientes(prev => prev.filter(c => c.id !== cliente.id));
      toast.success("Cliente excluído com sucesso!");
    }
  };

  // Filtrar obras com base no termo de busca
  const filteredObras = obras.filter(obra => 
    obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.cliente?.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Building className="mr-2 h-6 w-6 text-primary" />
            Obras
          </h1>
          <p className="text-muted-foreground">Gerencie e monitore todas as obras e clientes</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              {dialogContent?.type === 'novaObra' && (
                <ObraForm 
                  clientes={clientes} 
                  onClose={closeDialog}
                  onSave={handleCreateObra}
                />
              )}
              {dialogContent?.type === 'editarObra' && (
                <ObraForm 
                  obra={dialogContent.data}
                  clientes={clientes}
                  onClose={closeDialog}
                  onSave={handleUpdateObra}
                />
              )}
              {dialogContent?.type === 'verObra' && (
                <ObraDetails
                  obra={dialogContent.data}
                  onClose={closeDialog}
                />
              )}
              {dialogContent?.type === 'novoCliente' && (
                <ClienteForm
                  onClose={closeDialog}
                  onSave={handleCreateCliente}
                />
              )}
              {dialogContent?.type === 'editarCliente' && (
                <ClienteForm
                  cliente={dialogContent.data}
                  onClose={closeDialog}
                  onSave={handleUpdateCliente}
                />
              )}
            </DialogContent>
          </Dialog>
          <DialogTrigger asChild onClick={() => openDialog('novoCliente')}>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" /> 
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => openDialog('novaObra')}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 
              Nova Obra
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <Tabs defaultValue="obras">
        <TabsList className="mb-4">
          <TabsTrigger value="obras">Obras</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="obras">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar obras por nome, endereço, tipo ou cliente..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filtrar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredObras.length > 0 ? (
              filteredObras.map(obra => (
                <ObraCard 
                  key={obra.id} 
                  obra={obra} 
                  onEdit={() => openDialog('editarObra', obra)}
                  onView={() => openDialog('verObra', obra)}
                  onDelete={handleDeleteObra}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <HardHat className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
                <h3 className="font-medium text-lg">Nenhuma obra encontrada</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou cadastre uma nova obra.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="clientes">
          <div className="flex justify-end mb-4">
            <DialogTrigger asChild onClick={() => openDialog('novoCliente')}>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> 
                Novo Cliente
              </Button>
            </DialogTrigger>
          </div>
          
          <ClientesList
            clientes={clientes}
            onEdit={(cliente) => openDialog('editarCliente', cliente)}
            onDelete={handleDeleteCliente}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Obras;
