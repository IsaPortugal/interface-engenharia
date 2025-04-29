
import React, { useState } from 'react';
import { FileText, Plus, Search, ArrowUpRight, PenSquare, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
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
    description: 'Relatório de acompanhamento mensal das obras do Edifício Residencial Aurora, incluindo análise de cronograma, custos e qualidade.',
    attachments: 3
  },
  {
    id: 2,
    title: 'Relatório Semanal - Semana 45',
    project: 'Centro Comercial Vitória',
    date: '2023-11-15',
    author: 'RS',
    type: 'Semanal',
    description: 'Relatório de acompanhamento semanal das atividades executadas no Centro Comercial Vitória.',
    attachments: 2
  },
  {
    id: 3,
    title: 'Relatório Semanal - Semana 46',
    project: 'Hospital São Lucas',
    date: '2023-11-05',
    author: 'TC',
    type: 'Semanal',
    description: 'Relatório de acompanhamento semanal das atividades executadas no Hospital São Lucas.',
    attachments: 5
  },
  {
    id: 4,
    title: 'Relatório Mensal - Novembro/2023',
    project: 'Condomínio Park Avenue',
    date: '2023-11-10',
    author: 'EF',
    type: 'Mensal',
    description: 'Relatório de acompanhamento mensal das obras do Condomínio Park Avenue, incluindo análise de cronograma, custos e qualidade.',
    attachments: 4
  },
  {
    id: 5,
    title: 'Relatório Semanal - Semana 47',
    project: 'Edifício Residencial Aurora',
    date: '2023-11-12',
    author: 'MF',
    type: 'Semanal',
    description: 'Relatório de acompanhamento semanal das atividades executadas no Edifício Residencial Aurora.',
    attachments: 1
  }
];

const ReportCard = ({ report, onViewDetail }: { report: any, onViewDetail: (report: any) => void }) => {
  const typeColors = {
    'Mensal': 'text-purple-600',
    'Semanal': 'text-blue-600'
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
          <Label htmlFor="project">Obra</Label>
          <Select defaultValue={editMode && reportData ? reportData.project : undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a obra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Edifício Residencial Aurora">Edifício Residencial Aurora</SelectItem>
              <SelectItem value="Centro Comercial Vitória">Centro Comercial Vitória</SelectItem>
              <SelectItem value="Condomínio Park Avenue">Condomínio Park Avenue</SelectItem>
              <SelectItem value="Hospital São Lucas">Hospital São Lucas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="type">Tipo</Label>
          <Select defaultValue={editMode && reportData ? reportData.type : undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mensal">Mensal</SelectItem>
              <SelectItem value="Semanal">Semanal</SelectItem>
            </SelectContent>
          </Select>
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

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const filteredReports = reportsData.filter(report => 
    (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (report.type === 'Mensal' || report.type === 'Semanal')  // Only show Mensal or Semanal reports
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

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar relatórios por título ou obra..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="monthly">Mensais</TabsTrigger>
          <TabsTrigger value="weekly">Semanais</TabsTrigger>
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
