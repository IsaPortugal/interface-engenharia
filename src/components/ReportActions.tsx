
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
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .content { margin-bottom: 20px; }
        .footer { text-align: center; font-size: 12px; color: #666; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Relatório - ${report.title}</h1>
        <p>Projeto: ${report.project}</p>
        <p>Data: ${new Date(report.date).toLocaleDateString('pt-BR')}</p>
      </div>
      <div class="content">
        ${printContent}
      </div>
      <div class="footer">
        <p>Gerado por Sistema de Gerenciamento de Obras - ${new Date().toLocaleDateString('pt-BR')}</p>
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
    <div className="flex gap-3">
      <Button 
        className="flex-1 py-5"
        onClick={() => handlePrint()}
      >
        <Printer className="h-5 w-5 mr-2" />
        Imprimir
      </Button>
      
      <Button 
        variant="secondary"
        className="flex-1 py-5"
        onClick={handleDownload}
      >
        <Download className="h-5 w-5 mr-2" />
        Baixar
      </Button>
    </div>
  );
};

export default ReportActions;
