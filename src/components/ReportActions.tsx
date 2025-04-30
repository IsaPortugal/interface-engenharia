
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportActionsProps {
  report: any;
  printRef: React.RefObject<HTMLDivElement>;
}

const ReportActions: React.FC<ReportActionsProps> = ({ report, printRef }) => {
  const { toast } = useToast();

  // Handling print functionality
  const handlePrint = useReactToPrint({
    documentTitle: `Relatório - ${report.title}`,
    onAfterPrint: () => {
      toast({
        title: "Impresso com sucesso",
        description: "O relatório foi enviado para impressão."
      });
    },
    contentRef: printRef,
  });

  const handleDownload = () => {
    // Create a blob with HTML content
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Relatório - ${report.title}</title>
      <style>
        :root {
          --primary-color: #1976D2;
          --secondary-color: #f97316;
          --accent-color: #6c63ff;
          --text-color: #333;
          --background-color: #fff;
          --border-color: #eaeaea;
        }
        
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: var(--text-color);
          background-color: var(--background-color);
          margin: 0;
          padding: 0;
        }
        
        .container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 30px;
          box-sizing: border-box;
        }
        
        .report-header {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          padding: 30px;
          border-radius: 8px 8px 0 0;
          margin-bottom: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .report-header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        
        .report-header p {
          margin: 5px 0 0 0;
          opacity: 0.9;
        }
        
        .report-section {
          margin-bottom: 30px;
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border-left: 4px solid var(--primary-color);
        }
        
        .report-section h2 {
          color: var(--primary-color);
          margin-top: 0;
          font-size: 18px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .info-item {
          margin-bottom: 10px;
        }
        
        .info-label {
          font-weight: bold;
          color: var(--secondary-color);
          margin-bottom: 5px;
          font-size: 14px;
        }
        
        .info-value {
          margin: 0;
        }
        
        .image-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 20px;
        }
        
        .image-container {
          border: 1px solid var(--border-color);
          border-radius: 6px;
          overflow: hidden;
        }
        
        .image-container img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .image-caption {
          padding: 8px;
          text-align: center;
          font-size: 14px;
          background-color: #f9f9f9;
        }
        
        .incidents-section {
          background-color: #fff9e6;
          border-left: 4px solid #f0b400;
        }
        
        .incident-item {
          border: 1px solid #f0dbb4;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 15px;
          background-color: #fffcf5;
        }
        
        .incident-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .incident-title {
          font-weight: bold;
          margin: 0;
        }
        
        .incident-status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        
        .status-resolved {
          background-color: #e6f7ed;
          color: #00a650;
        }
        
        .status-pending {
          background-color: #ffeceb;
          color: #e53935;
        }
        
        .report-footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="report-header">
          <h1>Relatório - ${report.title}</h1>
          <p>Projeto: ${report.project}</p>
          <p>Data: ${new Date(report.date).toLocaleDateString('pt-BR')}</p>
        </div>
        
        <div class="report-section">
          <h2>Informações do Relatório</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Tipo</div>
              <p class="info-value">${report.type}</p>
            </div>
            
            <div class="info-item">
              <div class="info-label">Autor</div>
              <p class="info-value">Eng. ${report.author === 'EF' ? 'Eduardo Farias' : report.author === 'RS' ? 'Roberto Silva' : report.author === 'TC' ? 'Teresa Costa' : report.author === 'MF' ? 'Maria Fernandes' : 'Desconhecido'}</p>
            </div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Descrição</div>
            <p class="info-value">${report.description}</p>
          </div>
        </div>
        
        ${report.activitiesPerformed ? `
        <div class="report-section">
          <h2>Atividades Realizadas</h2>
          <p>${report.activitiesPerformed}</p>
        </div>
        ` : ''}
        
        ${report.weatherConditions ? `
        <div class="report-section">
          <h2>Condições Climáticas</h2>
          <p>${report.weatherConditions}</p>
        </div>
        ` : ''}
        
        ${report.imageDetails && report.imageDetails.length > 0 ? `
        <div class="report-section">
          <h2>Registro Fotográfico</h2>
          <div class="image-grid">
            ${report.imageDetails.map((img, index) => `
              <div class="image-container">
                <img src="${img.fileName.startsWith('/') ? img.fileName : '/placeholder.svg'}" alt="Imagem ${index + 1}" />
                <div class="image-caption">${img.caption || `Imagem ${index + 1}`}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        ${report.incidents && report.incidents.length > 0 ? `
        <div class="report-section incidents-section">
          <h2>Incidentes Registrados</h2>
          ${report.incidents.map(incident => `
            <div class="incident-item">
              <div class="incident-header">
                <h3 class="incident-title">${incident.title}</h3>
                <span class="incident-status ${incident.status === 'Resolvido' ? 'status-resolved' : 'status-pending'}">
                  ${incident.status}
                </span>
              </div>
              <p style="margin: 5px 0 0; font-size: 14px; color: #666;">Data: ${incident.date}</p>
              <p style="margin-top: 10px;">${incident.description}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${report.nextSteps ? `
        <div class="report-section">
          <h2>Próximas Etapas</h2>
          <p>${report.nextSteps}</p>
        </div>
        ` : ''}
        
        <div class="report-footer">
          <p>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} pelo Sistema de Gerenciamento de Obras</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Relatório-${report.title.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download concluído",
      description: "O relatório foi baixado com sucesso."
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-8 mb-4">
      <Button 
        className="w-full py-3"
        onClick={() => handlePrint()}
      >
        <Printer className="h-5 w-5 mr-2" />
        Imprimir
      </Button>
      
      <Button 
        variant="secondary"
        className="w-full py-3"
        onClick={handleDownload}
      >
        <Download className="h-5 w-5 mr-2" />
        Baixar
      </Button>
    </div>
  );
};

export default ReportActions;
