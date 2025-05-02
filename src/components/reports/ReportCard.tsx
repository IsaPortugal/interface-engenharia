
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

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
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
        <p className="text-gray-500 mb-2">{report.project}</p>
        <p className="text-gray-600 mb-3">Data: {report.date}</p>
        <p className="text-gray-600 mb-1 line-clamp-2">{report.description}</p>
        <p className="mt-3 font-medium">Status: Resolvido</p>
      </CardContent>
      
      <CardFooter className="px-5 py-4 border-t">
        <div className="card-footer-buttons">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetail(report)}
          >
            Detalhes
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(report)}
          >
            Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDelete(report.id)}
            className="text-red-500"
          >
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
