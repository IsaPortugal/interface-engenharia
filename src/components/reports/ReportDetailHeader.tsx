
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, Calendar, User } from 'lucide-react';

interface ReportDetailHeaderProps {
  report: any;
}

const ReportDetailHeader: React.FC<ReportDetailHeaderProps> = ({ report }) => {
  const date = new Date(report.date);
  const formattedDate = format(date, 'dd/MM/yyyy', { locale: ptBR });
  
  const getAuthorFullName = (author: string): string => {
    switch (author) {
      case 'EF': return 'Eduardo Farias';
      case 'RS': return 'Roberto Silva';
      case 'TC': return 'Teresa Costa';
      case 'MF': return 'Maria Fernandes';
      default: return 'Desconhecido';
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Informações do Relatório</h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Tipo</p>
            <p className="font-medium">{report.type}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Data</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Autor</p>
            <p className="font-medium">Eng. {getAuthorFullName(report.author)}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Projeto</p>
          <p className="font-medium">{report.project}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Descrição</p>
          <p className="text-gray-700">{report.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailHeader;
