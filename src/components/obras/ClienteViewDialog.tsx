
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Cliente } from '@/types/obras';

interface ClienteViewDialogProps {
  cliente?: Cliente | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClienteViewDialog = ({ cliente, open, onOpenChange }: ClienteViewDialogProps) => {
  if (!cliente) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Cliente</DialogTitle>
          <DialogDescription>
            Informações detalhadas do cliente selecionado.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Nome</span>
              <span className="font-medium">{cliente.nome}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Tipo</span>
              <Badge variant="outline">
                {cliente.tipo === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
              </Badge>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">
                {cliente.tipo === 'pf' ? 'CPF' : 'CNPJ'}
              </span>
              <span>{cliente.documento}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{cliente.email}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{cliente.telefone}</span>
            </div>
            
            {cliente.telefone2 && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{cliente.telefone2}</span>
              </div>
            )}
            
            {cliente.endereco && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{cliente.endereco}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Fechar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClienteViewDialog;
