
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
            <CardDescription className="text-sm">{report.project}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="text-sm text-muted-foreground">
            {formattedDate}
          </div>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{report.description}</p>
        <div className="text-sm text-muted-foreground mt-3 px-2 py-1 bg-gray-100 rounded-full inline-block">
          {report.type}
        </div>
      </CardContent>
      <CardFooter className="pt-0 justify-between">
        <div className="card-footer-buttons">
          <Button 
            variant="outline" 
            onClick={() => onViewDetail(report)}
            className="text-sm"
            size="sm"
          >
            Detalhes
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onEdit(report)}
            className="text-sm"
            size="sm"
          >
            Editar
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onDelete(report.id)}
            className="text-sm text-red-500 hover:text-red-600"
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
