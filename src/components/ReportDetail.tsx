
import React, { useRef } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, User, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import ReportActions from './ReportActions';
import { Progress } from '@/components/ui/progress';

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
  
  const statusColors = {
    'Aprovado': 'bg-green-100 text-green-800',
    'Em revisão': 'bg-yellow-100 text-yellow-800',
    'Pendente': 'bg-blue-100 text-blue-800',
    'Rejeitado': 'bg-red-100 text-red-800'
  };
  
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
                
                {report.progress !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Progresso da Obra</p>
                    <div className="space-y-2">
                      <Progress value={report.progress} className="h-2" />
                      <p className="text-sm font-medium text-right">{report.progress}% concluído</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Descrição</p>
                  <p className="text-gray-700">{report.description}</p>
                </div>
                
                {report.status === 'Aprovado' && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <p>Aprovado por: Diretor de Obras</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Conteúdo do Relatório</h3>
              <div className="space-y-4">
                <section>
                  <h4 className="text-base font-medium mb-2">Resumo Executivo</h4>
                  <p>
                    Este relatório apresenta o progresso da obra no período de referência. 
                    As atividades planejadas foram executadas conforme o cronograma, com pequenos
                    ajustes necessários devido a condições climáticas.
                  </p>
                </section>
                
                <section>
                  <h4 className="text-base font-medium mb-2">Progresso da Obra</h4>
                  <p>
                    A obra avançou conforme planejado, com conclusão de {report.progress || 85}% das fundações
                    e início da montagem das estruturas metálicas.
                  </p>
                  
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
                          {img.caption || `Foto ${index + 1}: Avanço da estrutura`}
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
                
                <section>
                  <h4 className="text-base font-medium mb-2">Questões e Riscos</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Atraso na entrega de materiais específicos - Mitigado com fornecedor alternativo</li>
                    <li>Condições climáticas adversas - Implementado plano de contingência</li>
                  </ul>
                </section>
                
                <section>
                  <h4 className="text-base font-medium mb-2">Próximas Etapas</h4>
                  {report.nextSteps ? (
                    <p>{report.nextSteps}</p>
                  ) : (
                    <>
                      <p>
                        Para o próximo período, está planejado:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Conclusão da estrutura metálica do bloco A</li>
                        <li>Início das instalações elétricas</li>
                        <li>Concretagem da laje do segundo pavimento</li>
                      </ul>
                    </>
                  )}
                </section>
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
