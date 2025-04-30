
import React, { useRef } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, User, AlertTriangle } from 'lucide-react';
import ReportActions from './ReportActions';

interface ReportDetailProps {
  report: any;
  isOpen: boolean;
  onClose: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, isOpen, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  if (!isOpen || !report) return null;
  
  const date = new Date(report.date);
  const formattedDate = format(date, 'dd MMMM yyyy', { locale: ptBR });
  
  // Use actual image details if available or fallback to mock images
  const reportImages = report.imageDetails || [
    { caption: 'Avanço da estrutura', fileName: '/placeholder.svg' },
    { caption: 'Fundações concluídas', fileName: '/placeholder.svg' },
    { caption: 'Vista geral da obra', fileName: '/placeholder.svg' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{report.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <div ref={printRef} className="space-y-6">
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
                    <p className="font-medium">Eng. {report.author === 'EF' ? 'Eduardo Farias' : report.author === 'RS' ? 'Roberto Silva' : report.author === 'TC' ? 'Teresa Costa' : report.author === 'MF' ? 'Maria Fernandes' : 'Desconhecido'}</p>
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
            
            <div>
              <h3 className="text-lg font-medium mb-2">Conteúdo do Relatório</h3>
              <div className="space-y-4">
                {report.activitiesPerformed && (
                  <section>
                    <h4 className="text-base font-medium mb-2">Atividades Realizadas</h4>
                    <p>{report.activitiesPerformed}</p>
                  </section>
                )}
                
                {report.weatherConditions && (
                  <section>
                    <h4 className="text-base font-medium mb-2">Condições Climáticas</h4>
                    <p>{report.weatherConditions}</p>
                  </section>
                )}
                
                <section>
                  <h4 className="text-base font-medium mb-2">Registro Fotográfico</h4>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {reportImages.map((img, index) => (
                      <div key={index} className="border rounded-md overflow-hidden">
                        <img 
                          src={img.fileName.startsWith('/') ? img.fileName : URL.createObjectURL(new Blob())} 
                          alt={`Imagem da obra ${index + 1}`} 
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                        <div className="p-2 text-sm text-center text-gray-600">
                          {img.caption || `Foto ${index + 1}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                {report.incidents && report.incidents.length > 0 && (
                  <section>
                    <h4 className="text-base font-medium mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-1 text-amber-500" />
                      Incidentes Registrados
                    </h4>
                    <div className="space-y-3">
                      {report.incidents.map((incident: any, idx: number) => (
                        <div key={idx} className="border rounded-md p-3 bg-amber-50">
                          <div className="flex justify-between">
                            <h5 className="font-medium">{incident.title}</h5>
                            <Badge variant={incident.status === 'Resolvido' ? 'outline' : 'destructive'}>
                              {incident.status}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1 text-gray-600">Data: {incident.date}</p>
                          <p className="text-sm mt-2">{incident.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                
                {report.nextSteps && (
                  <section>
                    <h4 className="text-base font-medium mb-2">Próximas Etapas</h4>
                    <p>{report.nextSteps}</p>
                  </section>
                )}
              </div>
            </div>
          </div>
          
          <ReportActions report={report} printRef={printRef} />
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
