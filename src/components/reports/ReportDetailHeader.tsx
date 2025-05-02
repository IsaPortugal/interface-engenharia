
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
    <div className="rounded-md overflow-hidden">
      <div className="bg-white text-black p-6 mb-4 border rounded-md shadow-sm">
        <h2 className="text-2xl font-bold text-blue-600">Relatório - {report.title}</h2>
        <p className="mt-1">Projeto: {report.project}</p>
        <p className="mt-1">Data: {formattedDate}</p>
      </div>
      
      <div className="bg-white p-4 mb-4 border rounded-md shadow-sm">
        <h3 className="text-blue-600 text-lg font-medium mb-4 border-b pb-2">Informações do Relatório</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-blue-600 font-medium">Tipo</p>
            <p className="font-medium text-black">{report.type}</p>
          </div>
          
          <div>
            <p className="text-sm text-blue-600 font-medium">Autor</p>
            <p className="font-medium text-black">Eng. {getAuthorFullName(report.author)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-blue-600 font-medium mb-1">Descrição</p>
          <p className="text-black">{report.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailHeader;
