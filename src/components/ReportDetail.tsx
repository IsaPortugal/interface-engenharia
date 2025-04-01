
import React, { useRef } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText, Calendar, User, CheckCircle, Clock } from 'lucide-react';
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
  
  const statusColors = {
    'Aprovado': 'bg-green-100 text-green-800',
    'Em revisão': 'bg-yellow-100 text-yellow-800',
    'Pendente': 'bg-blue-100 text-blue-800',
    'Rejeitado': 'bg-red-100 text-red-800'
  };
  
  // Mock images for the demo
  const reportImages = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div ref={printRef}>
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Informações do Relatório</CardTitle>
                      <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                        {report.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback>{report.author}</AvatarFallback>
                              </Avatar>
                              <p className="font-medium">Eng. {report.author === 'EF' ? 'Eduardo Farias' : report.author === 'RS' ? 'Roberto Silva' : report.author === 'TC' ? 'Teresa Costa' : report.author === 'MF' ? 'Maria Fernandes' : 'Desconhecido'}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Última Atualização</p>
                            <p className="font-medium">{formattedDate}</p>
                          </div>
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
                      
                      {report.status === 'Aprovado' && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <p>Aprovado por: Diretor de Obras</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Report Content */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Conteúdo do Relatório</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-medium mb-2">Resumo Executivo</h3>
                        <p>
                          Este relatório apresenta o progresso da obra no período de referência. 
                          As atividades planejadas foram executadas conforme o cronograma, com pequenos
                          ajustes necessários devido a condições climáticas.
                        </p>
                      </section>
                      
                      <section>
                        <h3 className="text-lg font-medium mb-2">Progresso da Obra</h3>
                        <p>
                          A obra avançou conforme planejado, com conclusão de 85% das fundações
                          e início da montagem das estruturas metálicas.
                        </p>
                        
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {reportImages.map((img, index) => (
                            <div key={index} className="border rounded-md overflow-hidden">
                              <img 
                                src={img} 
                                alt={`Imagem da obra ${index + 1}`} 
                                className="w-full h-48 object-cover"
                              />
                              <div className="p-2 text-sm text-center text-gray-600">
                                Foto {index + 1}: Avanço da estrutura
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                      
                      <section>
                        <h3 className="text-lg font-medium mb-2">Questões e Riscos</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Atraso na entrega de materiais específicos - Mitigado com fornecedor alternativo</li>
                          <li>Condições climáticas adversas - Implementado plano de contingência</li>
                        </ul>
                      </section>
                      
                      <section>
                        <h3 className="text-lg font-medium mb-2">Próximas Etapas</h3>
                        <p>
                          Para o próximo período, está planejado:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>Conclusão da estrutura metálica do bloco A</li>
                          <li>Início das instalações elétricas</li>
                          <li>Concretagem da laje do segundo pavimento</li>
                        </ul>
                      </section>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReportActions report={report} printRef={printRef} />
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Anexos ({report.attachments})</h3>
                    <div className="space-y-2">
                      {Array.from({ length: report.attachments }).map((_, index) => (
                        <div 
                          key={index} 
                          className="flex items-center p-2 rounded-md border hover:bg-gray-50 cursor-pointer"
                        >
                          <FileText className="h-4 w-4 mr-2 text-blue-600" />
                          <span>Anexo {index + 1}.pdf</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
