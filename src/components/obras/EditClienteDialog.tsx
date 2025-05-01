
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Cliente } from '@/types/obras';
import NovoClienteForm from './NovoClienteForm';

interface EditClienteDialogProps {
  cliente?: Cliente | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Cliente, 'id'>) => void;
}

const EditClienteDialog = ({ cliente, isOpen, onOpenChange, onSave }: EditClienteDialogProps) => {
  if (!cliente) return null;
  
  const handleSave = (data: Omit<Cliente, 'id'>) => {
    onSave(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <NovoClienteForm 
          initialData={cliente}
          onClose={() => onOpenChange(false)} 
          onSave={handleSave} 
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditClienteDialog;
