
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import NovoClienteForm from './NovoClienteForm';
import { Cliente } from '@/types/obras';
import { ClienteFormValues } from '@/components/clientes/form/ClienteSchema';

interface EditClienteDialogProps {
  cliente: Cliente | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ClienteFormValues) => void;
}

const EditClienteDialog = ({ cliente, isOpen, onOpenChange, onSave }: EditClienteDialogProps) => {
  if (!cliente) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <NovoClienteForm 
          initialData={cliente}
          onClose={() => onOpenChange(false)} 
          onSave={onSave}
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditClienteDialog;
