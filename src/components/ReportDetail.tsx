
import React, { useRef } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

  // Referência aos autores sem mostrar iniciais
  const getFullAuthorName = (authorCode: string) => {
    switch(authorCode) {
      case 'EF': return 'Eduardo Farias';
      case 'RS': return 'Roberto Silva';
      case 'TC': return 'Teresa Costa';
      case 'MF': return 'Maria Fernandes';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
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
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="font-medium">{report.type}</p>
              </div>
                
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Data</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
                
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Autor</p>
                <p className="font-medium">Eng. {getFullAuthorName(report.author)}</p>
              </div>
                
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Projeto</p>
                <p className="font-medium">{report.project}</p>
              </div>
                
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Descrição</p>
                <p className="text-gray-700">{report.description}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Conteúdo do Relatório</h3>
              
              <section className="mb-6">
                <h4 className="text-base font-medium mb-2">Resumo Executivo</h4>
                <p>
                  Este relatório apresenta o progresso da obra no período de referência. 
                  As atividades planejadas foram executadas conforme o cronograma, com pequenos
                  ajustes necessários devido a condições climáticas.
                </p>
              </section>
                
              <section className="mb-6">
                <h4 className="text-base font-medium mb-2">Progresso da Obra</h4>
                <p>
                  A obra avançou conforme planejado, com conclusão de 85% das fundações
                  e início da montagem das estruturas metálicas.
                </p>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'].map((img, index) => (
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
                
              <section className="mb-6">
                <h4 className="text-base font-medium mb-2">Questões e Riscos</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Atraso na entrega de materiais específicos - Mitigado com fornecedor alternativo</li>
                  <li>Condições climáticas adversas - Implementado plano de contingência</li>
                </ul>
              </section>
                
              <section className="mb-6">
                <h4 className="text-base font-medium mb-2">Próximas Etapas</h4>
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
          </div>
          
          <ReportActions report={report} printRef={printRef} />
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
