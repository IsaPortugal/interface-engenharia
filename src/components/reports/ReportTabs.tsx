
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReportCard from './ReportCard';
import { FileText } from 'lucide-react';
import { ReportData } from './ReportsData';

interface ReportTabsProps {
  reports: ReportData[];
  onViewDetail: (report: ReportData) => void;
  onEdit: (report: ReportData) => void;
  onDelete: (id: number) => void;
  onGeneratePDF: (report: ReportData) => void;
}

const ReportTabs: React.FC<ReportTabsProps> = ({ 
  reports, 
  onViewDetail, 
  onEdit, 
  onDelete, 
  onGeneratePDF 
}) => {
  return (
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
                onViewDetail={onViewDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                onGeneratePDF={onGeneratePDF}
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
                onViewDetail={onViewDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                onGeneratePDF={onGeneratePDF}
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
                onViewDetail={onViewDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                onGeneratePDF={onGeneratePDF}
              />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
