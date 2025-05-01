
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
      <div className="bg-[#1976D2] text-white p-6 mb-4">
        <h2 className="text-2xl font-bold">Relatório - {report.title}</h2>
        <p className="mt-1">Projeto: {report.project}</p>
        <p className="mt-1">Data: {formattedDate}</p>
        <p className="mt-1">VPro engenharia</p>
      </div>
      
      <div className="bg-[#1976D2] p-4 mb-4 text-black">
        <h3 className="text-[#f97316] text-lg font-medium mb-4 border-b pb-2">Informações do Relatório</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#f97316] font-medium">Tipo</p>
            <p className="font-medium">{report.type}</p>
          </div>
          
          <div>
            <p className="text-sm text-[#f97316] font-medium">Autor</p>
            <p className="font-medium">Eng. {getAuthorFullName(report.author)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-[#f97316] font-medium mb-1">Descrição</p>
          <p className="text-black">{report.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailHeader;
