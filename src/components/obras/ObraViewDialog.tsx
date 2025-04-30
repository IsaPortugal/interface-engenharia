
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Obra, Cliente } from '@/types/obras';
import { Badge } from '@/components/ui/badge';

interface ObraViewDialogProps {
  obra: Obra | null;
  cliente: Cliente | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ObraViewDialog = ({ obra, cliente, open, onOpenChange }: ObraViewDialogProps) => {
  if (!obra) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{obra.nome}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Informações da obra */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-1">Dados da Obra</h3>
            
            <div className="grid gap-2">
              <h4 className="font-medium">Endereço</h4>
              <p>{obra.endereco}</p>
            </div>
            
            <div className="grid gap-2">
              <h4 className="font-medium">Status</h4>
              <p>{obra.status}</p>
            </div>
            
            <div className="grid gap-2">
              <h4 className="font-medium">Tipo</h4>
              <p>{obra.tipo}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <h4 className="font-medium">Início</h4>
                <p>{obra.inicio}</p>
              </div>
              <div className="grid gap-2">
                <h4 className="font-medium">Previsão de término</h4>
                <p>{obra.previsaoTermino || obra.prazo}</p>
              </div>
            </div>
            
            <div className="grid gap-2">
              <h4 className="font-medium">Responsável</h4>
              <p>{obra.responsavel}</p>
            </div>
          </div>
          
          {/* Informações do cliente */}
          {cliente && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium border-b pb-1">Dados do Cliente</h3>
              
              <div className="grid gap-2">
                <h4 className="font-medium">Nome</h4>
                <p>{cliente.nome}</p>
              </div>
              
              <div className="grid gap-2">
                <h4 className="font-medium">Tipo</h4>
                <Badge variant="outline">
                  {cliente.tipo === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                </Badge>
              </div>
              
              <div className="grid gap-2">
                <h4 className="font-medium">{cliente.tipo === 'pf' ? 'CPF' : 'CNPJ'}</h4>
                <p>{cliente.documento}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <h4 className="font-medium">E-mail</h4>
                  <p>{cliente.email}</p>
                </div>
                <div className="grid gap-2">
                  <h4 className="font-medium">Telefone</h4>
                  <p>{cliente.telefone}</p>
                </div>
              </div>
            </div>
          )}
          
          {obra.observacoes && (
            <div className="grid gap-2 border-t pt-4">
              <h3 className="text-lg font-medium">Observações</h3>
              <p className="text-gray-700">{obra.observacoes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ObraViewDialog;
