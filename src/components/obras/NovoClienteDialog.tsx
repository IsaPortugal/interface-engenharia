
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import NovoClienteForm from './NovoClienteForm';
import { Cliente } from '@/types/obras';

interface NovoClienteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Cliente, 'id'>) => void;
}

const NovoClienteDialog = ({ isOpen, onOpenChange, onSave }: NovoClienteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <NovoClienteForm 
          onClose={() => onOpenChange(false)} 
          onSave={onSave} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default NovoClienteDialog;
