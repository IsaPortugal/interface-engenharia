
import React, { useState } from 'react';
import { FileText, Plus, Eye, Pencil, Trash2, Image as ImageIcon, Upload, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import ReportDetail from '@/components/ReportDetail';

// Reduced to just 3 reports as requested
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
  }
];

const ReportCard = ({ report, onViewDetail, onEdit, onDelete, onGeneratePDF }: { 
  report: any, 
  onViewDetail: (report: any) => void,
  onEdit: (report: any) => void,
  onDelete: (id: number) => void,
  onGeneratePDF: (report: any) => void
}) => {
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
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-muted-foreground">{report.type}</span>
          </div>
          <div className="text-muted-foreground">
            {formattedDate}
          </div>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{report.description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{report.author}</AvatarFallback>
        </Avatar>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => onViewDetail(report)}>
            <Eye className="h-4 w-4 mr-1" /> Visualizar
          </Button>
          <Button size="sm" variant="outline" onClick={() => onEdit(report)}>
            <Pencil className="h-4 w-4 mr-1" /> Editar
          </Button>
          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600" onClick={() => onDelete(report.id)}>
            <Trash2 className="h-4 w-4 mr-1" /> Excluir
          </Button>
          <Button size="sm" variant="outline" onClick={() => onGeneratePDF(report)}>
            <FileDown className="h-4 w-4 mr-1" /> PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ReportForm = ({ onClose, onSave, editMode = false, reportData = null }: { 
  onClose: () => void, 
  onSave: (data: any) => void,
  editMode?: boolean, 
  reportData?: any 
}) => {
  const [title, setTitle] = useState(editMode && reportData ? reportData.title : '');
  const [project, setProject] = useState(editMode && reportData ? reportData.project : '');
  const [type, setType] = useState(editMode && reportData ? reportData.type : '');
  const [description, setDescription] = useState(editMode && reportData ? reportData.description : '');
  const [date, setDate] = useState(editMode && reportData ? reportData.date : new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      project,
      type,
      description,
      date,
      author: 'EF', // Default author
      attachments: editMode && reportData ? reportData.attachments : 0
    };
    onSave(data);
  };

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
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              placeholder="Ex: Relatório Mensal - Novembro/2023" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="project">Obra</Label>
            <Select value={project} onValueChange={setProject} required>
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
            <Select value={type} onValueChange={setType} required>
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
            <Label htmlFor="date">Data</Label>
            <Input 
              id="date" 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              placeholder="Descreva o conteúdo e objetivo deste relatório..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
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
      </form>
    </>
  );
};

const Reports = () => {
  const [reports, setReports] = useState(reportsData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDeleteId, setReportToDeleteId] = useState<number | null>(null);

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setDetailDialogOpen(true);
  };

  const handleEditReport = (report: any) => {
    setSelectedReport(report);
    setEditDialogOpen(true);
  };

  const handleDeleteReport = (id: number) => {
    setReportToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteReport = () => {
    if (reportToDeleteId) {
      const reportToDelete = reports.find(report => report.id === reportToDeleteId);
      setReports(reports.filter(report => report.id !== reportToDeleteId));
      setDeleteDialogOpen(false);
      toast({
        title: "Relatório excluído",
        description: `O relatório "${reportToDelete?.title}" foi excluído com sucesso.`
      });
    }
  };

  const handleGeneratePDF = (report: any) => {
    toast({
      title: "PDF Gerado",
      description: `O PDF do relatório "${report.title}" foi gerado com sucesso.`
    });
  };

  const handleSaveReport = (data: any) => {
    const newReport = {
      id: reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1,
      ...data
    };
    
    setReports([...reports, newReport]);
    setDialogOpen(false);
    
    toast({
      title: "Relatório criado",
      description: `O relatório "${data.title}" foi criado com sucesso.`
    });
  };

  const handleUpdateReport = (data: any) => {
    if (selectedReport) {
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === selectedReport.id 
            ? { ...report, ...data } 
            : report
        )
      );
      
      setEditDialogOpen(false);
      
      toast({
        title: "Relatório atualizado",
        description: `O relatório "${data.title}" foi atualizado com sucesso.`
      });
    }
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
            <ReportForm 
              onClose={() => setDialogOpen(false)} 
              onSave={handleSaveReport}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="monthly">Mensais</TabsTrigger>
          <TabsTrigger value="weekly">Semanais</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.length > 0 ? (
              reports.map(report => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  onViewDetail={handleViewReport}
                  onEdit={handleEditReport}
                  onDelete={handleDeleteReport}
                  onGeneratePDF={handleGeneratePDF}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-3 opacity-40" />
                <h3 className="font-medium text-lg">Nenhum relatório encontrado</h3>
                <p className="text-muted-foreground">
                  Crie um novo relatório para começar.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports
              .filter(report => report.type === 'Mensal')
              .map(report => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  onViewDetail={handleViewReport}
                  onEdit={handleEditReport}
                  onDelete={handleDeleteReport}
                  onGeneratePDF={handleGeneratePDF}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports
              .filter(report => report.type === 'Semanal')
              .map(report => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  onViewDetail={handleViewReport}
                  onEdit={handleEditReport}
                  onDelete={handleDeleteReport}
                  onGeneratePDF={handleGeneratePDF}
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
            onSave={handleUpdateReport}
            editMode={true}
            reportData={selectedReport}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este relatório? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteReport} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Report Detail with PDF generation */}
      <ReportDetail
        report={selectedReport}
        isOpen={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
      />
    </div>
  );
};

export default Reports;
