
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import NovaObraForm from './NovaObraForm';
import { Cliente, Obra } from '@/types/obras';

interface NovaObraDialogProps {
  obra?: Obra;
  cliente?: Cliente;
  clientes?: Cliente[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (obraData: Omit<Obra, 'id'>, clienteData: Omit<Cliente, 'id'>) => void;
  isEdit?: boolean;
}

const NovaObraDialog = ({ 
  obra, 
  cliente, 
  clientes = [],
  isOpen, 
  onOpenChange, 
  onSave,
  isEdit = false 
}: NovaObraDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <NovaObraForm 
          obra={obra}
          cliente={cliente}
          clientes={clientes}
          onClose={() => onOpenChange(false)} 
          onSave={onSave}
          isEdit={isEdit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NovaObraDialog;
