
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
  const formattedDate = format(date, 'dd/MM/yyyy', { locale: ptBR });

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{report.title}</CardTitle>
            <CardDescription className="text-xs">{report.project}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="text-xs text-muted-foreground">
            {formattedDate}
          </div>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{report.description}</p>
        <div className="text-xs text-muted-foreground mt-3 px-2 py-1 bg-gray-100 rounded-full inline-block">
          {report.type}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          onClick={() => onViewDetail(report)}
          className="text-xs px-3 py-1 h-7"
          size="sm"
        >
          Detalhes
        </Button>
        <div className="space-x-1">
          <Button 
            variant="ghost" 
            onClick={() => onEdit(report)}
            className="text-xs px-3 py-1 h-7"
            size="sm"
          >
            Editar
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onDelete(report.id)}
            className="text-xs px-3 py-1 h-7 text-red-500 hover:text-red-600 hover:bg-red-50"
            size="sm"
          >
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
