
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import NovaObraForm from './NovaObraForm';
import { Cliente, Obra } from '@/types/obras';

interface NovaObraDialogProps {
  clientes: Cliente[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Obra, 'id'>) => void;
  onNovoCliente: () => void;
}

const NovaObraDialog = ({ 
  clientes, 
  isOpen, 
  onOpenChange, 
  onSave, 
  onNovoCliente 
}: NovaObraDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> 
          Nova Obra
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <NovaObraForm 
          clientes={clientes} 
          onClose={() => onOpenChange(false)} 
          onSave={onSave}
          onNovoCliente={onNovoCliente}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NovaObraDialog;
