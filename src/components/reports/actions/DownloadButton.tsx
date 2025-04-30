
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateHtmlContent } from './reportHtmlGenerator';

interface DownloadButtonProps {
  report: any;
  printRef: React.RefObject<HTMLDivElement>;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ report, printRef }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;

    const htmlContent = generateHtmlContent(report);
    
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
    <Button 
      variant="secondary"
      className="w-full py-3"
      onClick={handleDownload}
    >
      <Download className="h-5 w-5 mr-2" />
      Baixar
    </Button>
  );
};

export default DownloadButton;
