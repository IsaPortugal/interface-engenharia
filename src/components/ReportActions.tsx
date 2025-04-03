
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Download, Printer, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ReportActionsProps {
  report: any;
  printRef: React.RefObject<HTMLDivElement>;
}

const ReportActions: React.FC<ReportActionsProps> = ({ report, printRef }) => {
  const { toast } = useToast();

  // Fix: The content property needs to be passed as a function
  const handlePrint = useReactToPrint({
    documentTitle: `Relatório - ${report.title}`,
    onAfterPrint: () => {
      toast({
        title: "Impresso com sucesso",
        description: "O relatório foi enviado para impressão."
      });
    },
    // This is the correct way to specify the content
    content: () => printRef.current,
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Relatório - ${report.title}`,
          text: `Compartilhando o relatório "${report.title}" do projeto "${report.project}"`,
        });
        
        toast({
          title: "Compartilhamento iniciado",
          description: "Use as opções do seu dispositivo para compartilhar."
        });
      } catch (error) {
        toast({
          title: "Erro ao compartilhar",
          description: "Ocorreu um problema ao tentar compartilhar.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Compartilhamento não suportado",
        description: "Seu navegador não suporta a API de compartilhamento.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        className="flex items-center gap-2" 
        // Fix: We need to create a wrapper function to handle the button click event
        onClick={() => handlePrint()}
      >
        <Printer className="h-4 w-4" />
        Imprimir
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2" 
        onClick={handleDownload}
      >
        <Download className="h-4 w-4" />
        Baixar
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2" 
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        Compartilhar
      </Button>
    </div>
  );
};

export default ReportActions;
