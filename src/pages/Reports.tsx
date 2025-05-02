
import React, { useState } from 'react';
import { FileText, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import ReportDetail from '@/components/ReportDetail';
import ReportForm from '@/components/reports/ReportForm';
import ReportTabs from '@/components/reports/ReportTabs';
import { reportsData, ReportData } from '@/components/reports/ReportsData';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';

const Reports: React.FC = () => {
  const [reports, setReports] = useState<ReportData[]>(reportsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDeleteId, setReportToDeleteId] = useState<number | null>(null);

  // Filter reports based on search term
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewReport = (report: ReportData) => {
    console.log("View report clicked:", report);
    setSelectedReport(report);
    setDetailDialogOpen(true);
  };

  const handleEditReport = (report: ReportData) => {
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

  const handleGeneratePDF = (report: ReportData) => {
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

      {/* Added search field */}
      <div className="mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar relatórios por título, projeto ou tipo..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ReportTabs 
        reports={filteredReports}
        onViewDetail={handleViewReport}
        onEdit={handleEditReport}
        onDelete={handleDeleteReport}
        onGeneratePDF={handleGeneratePDF}
      />

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
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDeleteReport}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir este relatório? Esta ação não pode ser desfeita."
      />

      {/* Report Detail with PDF generation */}
      {selectedReport && (
        <ReportDetail
          report={selectedReport}
          isOpen={detailDialogOpen}
          onClose={() => setDetailDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Reports;
