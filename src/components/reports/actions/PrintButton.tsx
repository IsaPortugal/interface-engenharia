
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrintButtonProps {
  reportTitle: string;
  printRef: React.RefObject<HTMLDivElement>;
}

const PrintButton: React.FC<PrintButtonProps> = ({ reportTitle, printRef }) => {
  const { toast } = useToast();

  // Handling print functionality
  const handlePrint = useReactToPrint({
    documentTitle: `Relatório - ${reportTitle}`,
    onAfterPrint: () => {
      toast({
        title: "Impresso com sucesso",
        description: "O relatório foi enviado para impressão."
      });
    },
    contentRef: printRef,
  });

  return (
    <Button 
      className="w-full py-3"
      onClick={() => handlePrint()}
    >
      <Printer className="h-5 w-5 mr-2" />
      Imprimir
    </Button>
  );
};

export default PrintButton;
