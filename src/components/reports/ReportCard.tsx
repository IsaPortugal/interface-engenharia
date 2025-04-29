
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, Eye, Pencil, Trash2, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ReportCardProps {
  report: {
    id: number;
    title: string;
    project: string;
    date: string;
    author: string;
    type: string;
    description: string;
    attachments: number;
  };
  onViewDetail: (report: any) => void;
  onEdit: (report: any) => void;
  onDelete: (id: number) => void;
  onGeneratePDF: (report: any) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onViewDetail, onEdit, onDelete, onGeneratePDF }) => {
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

export default ReportCard;
