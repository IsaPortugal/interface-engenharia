import React, { useState, useRef } from 'react';
import { FileText, Plus, Search, Filter, Download, ArrowUpRight, PenSquare, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ReportDetail from '@/components/ReportDetail';

const reportsData = [
  {
    id: 1,
    title: 'Relatório Mensal - Outubro/2023',
    project: 'Edifício Residencial Aurora',
    date: '2023-10-31',
    author: 'EF',
    type: 'Mensal',
    status: 'Aprovado',
    description: 'Relatório de acompanhamento mensal das obras do Edifício Residencial Aurora, incluindo análise de cronograma, custos e qualidade.',
    attachments: 3
  },
  {
    id: 2,
    title: 'Vistoria Estrutural',
    project: 'Centro Comercial Vitória',
    date: '2023-11-15',
    author: 'RS',
    type: 'Técnico',
    status: 'Em revisão',
    description: 'Relatório técnico sobre a análise estrutural do Centro Comercial Vitória, com foco nas fundações e pilares principais.',
    attachments: 2
  },
  {
    id: 3,
    title: 'Inspeção de Qualidade',
    project: 'Hospital São Lucas',
    date: '2023-11-05',
    author: 'TC',
    type: 'Inspeção',
    status: 'Aprovado',
    description: 'Relatório de inspeção de qualidade das instalações elétricas e hidráulicas do Hospital São Lucas.',
    attachments: 5
  },
  {
    id: 4,
    title: 'Análise de Custos',
    project: 'Condomínio Park Avenue',
    date: '2023-11-10',
    author: 'EF',
    type: 'Financeiro',
    status: 'Pendente',
    description: 'Relatório detalhando a análise de custos e fluxo financeiro do projeto Condomínio Park Avenue no terceiro trimestre.',
    attachments: 4
  },
  {
    id: 5,
    title: 'Relatório Semanal - Semana 45',
    project: 'Edifício Residencial Aurora',
    date: '2023-11-12',
    author: 'MF',
    type: 'Semanal',
    status: 'Aprovado',
    description: 'Relatório de acompanhamento semanal das atividades executadas no Edifício Residencial Aurora.',
    attachments: 1
  }
];

const ReportCard = ({ report, onViewDetail }: { report: any, onViewDetail: (report: any) => void }) => {
  const statusColors = {
    'Aprovado': 'bg-green-100 text-green-800',
    'Em revisão': 'bg-yellow-100 text-yellow-800',
    'Pendente': 'bg-blue-100 text-blue-800',
    'Rejeitado': 'bg-red-100 text-red-800'
  };

  const typeColors = {
    'Mensal': 'text-purple-600',
    'Semanal': 'text-blue-600',
    'Técnico': 'text-orange-600',
    'Inspeção': 'text-green-600',
    'Financeiro': 'text-gray-600'
  };

  const date = new Date(report.date);
  const formattedDate = format(date, 'dd MMM yyyy', { locale: ptBR });

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{report.title}</CardTitle>
            <CardDescription className="text-sm">{report.project}</CardDescription>
          </div>
          <Badge className={statusColors[report.status as keyof typeof statusColors]}>
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{report.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <FileText className={`h-4 w-4 ${typeColors[report.type as keyof typeof typeColors]}`} />
            <span className="text-muted-foreground">{report.type}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            {report.attachments > 0 && (
              <div className="flex items-center mr-3">
                <ImageIcon className="h-3.5 w-3.5 mr-1" />
                <span>{report.attachments}</span>
              </div>
            )}
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{report.author}</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">Ações</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() => onViewDetail(report)}>
              <FileText className="h-4 w-4 mr-2" /> Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Download className="h-4 w-4 mr-2" /> Baixar
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <PenSquare className="h-4 w-4 mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <Trash2 className="h-4 w-4 mr-2" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

const ReportForm = ({ onClose, editMode = false, reportData = null }: { onClose: () => void, editMode?: boolean, reportData?: any }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{editMode ? 'Editar Relatório' : 'Criar Novo Relatório'}</DialogTitle>
        <DialogDescription>
          {editMode 
            ? 'Modifique as informações do relatório existente.' 
            : 'Preencha os detalhes do novo relatório.'}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Título</Label>
          <Input 
            id="title" 
            placeholder="Ex: Relatório Mensal - Novembro/2023" 
            defaultValue={editMode && reportData ? reportData.title : ''}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="project">Projeto</Label>
          <Select defaultValue={editMode && reportData ? reportData.project : undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o projeto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Edifício Residencial Aurora">Edifício Residencial Aurora</SelectItem>
              <SelectItem value="Centro Comercial Vitória">Centro Comercial Vitória</SelectItem>
              <SelectItem value="Condomínio Park Avenue">Condomínio Park Avenue</SelectItem>
              <SelectItem value="Hospital São Lucas">Hospital São Lucas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo</Label>
            <Select defaultValue={editMode && reportData ? reportData.type : undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mensal">Mensal</SelectItem>
                <SelectItem value="Semanal">Semanal</SelectItem>
                <SelectItem value="Técnico">Técnico</SelectItem>
                <SelectItem value="Inspeção">Inspeção</SelectItem>
                <SelectItem value="Financeiro">Financeiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={editMode && reportData ? reportData.status : "Pendente"}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Em revisão">Em revisão</SelectItem>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea 
            id="description" 
            placeholder="Descreva o conteúdo e objetivo deste relatório..." 
            defaultValue={editMode && reportData ? reportData.description : ''}
            rows={5}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="attachments">Anexar Imagens</Label>
          <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Arraste e solte imagens aqui ou clique para selecionar</p>
            <p className="text-xs text-muted-foreground mt-1">Suporta PNG, JPG ou JPEG (máx. 5MB cada)</p>
            <Input id="attachments" type="file" multiple className="hidden" />
          </div>
          {editMode && reportData && reportData.attachments > 0 && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                {reportData.attachments} imagens anexadas atualmente
              </p>
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
        <Button type="submit">{editMode ? 'Atualizar' : 'Criar'} Relatório</Button>
      </DialogFooter>
    </>
  );
};

const statsData = [
  { title: 'Total Relatórios', value: '48', trend: '+5', icon: FileText, color: 'bg-blue-100 text-blue-800' },
  { title: 'Aprovados', value: '32', trend: '+3', icon: FileText, color: 'bg-green-100 text-green-800' },
  { title: 'Em Revisão', value: '10', trend: '+1', icon: FileText, color: 'bg-yellow-100 text-yellow-800' },
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const filteredReports = reportsData.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setDetailDialogOpen(true);
  };

  return (
    <div className="container max-w-6xl mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FileText className="mr-2 h-6 w-6 text-primary" />
            Relatórios
          </h1>
          <p className="text-muted-foreground">Gerencie todos os relatórios relacionados às obras</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" /> 
              Novo Relatório
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <ReportForm onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.trend} este mês
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar relatórios por título, projeto ou tipo..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filtrar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="monthly">Mensais</TabsTrigger>
          <TabsTrigger value="weekly">Semanais</TabsTrigger>
          <TabsTrigger value="technical">Técnicos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  onViewDetail={handleViewReport}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
                <h3 className="font-medium text-lg">Nenhum relatório encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou crie um novo relatório.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports
              .filter(report => report.type === 'Mensal')
              .map(report => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  onViewDetail={handleViewReport}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports
              .filter(report => report.type === 'Semanal')
              .map(report => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  onViewDetail={handleViewReport}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports
              .filter(report => report.type === 'Técnico')
              .map(report => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  onViewDetail={handleViewReport}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Report Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <ReportForm 
            onClose={() => setEditDialogOpen(false)} 
            editMode={true}
            reportData={selectedReport}
          />
        </DialogContent>
      </Dialog>

      {/* Report Detail with Print/Download */}
      <ReportDetail
        report={selectedReport}
        isOpen={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
      />
    </div>
  );
};

export default Reports;
