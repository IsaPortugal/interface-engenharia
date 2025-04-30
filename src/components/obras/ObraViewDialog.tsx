
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Obra } from '@/types/obras';

interface ObraViewDialogProps {
  obra: Obra | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ObraViewDialog = ({ obra, open, onOpenChange }: ObraViewDialogProps) => {
  if (!obra) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{obra.nome}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <h3 className="font-medium">Endereço</h3>
            <p>{obra.endereco}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-medium">Status</h3>
            <p>{obra.status}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-medium">Tipo</h3>
            <p>{obra.tipo}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-medium">Cliente</h3>
            <p>{obra.cliente}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-medium">Início</h3>
            <p>{obra.inicio}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-medium">Previsão de término</h3>
            <p>{obra.previsaoTermino || obra.prazo}</p>
          </div>
          {obra.observacoes && (
            <div className="grid gap-2">
              <h3 className="font-medium">Observações</h3>
              <p>{obra.observacoes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ObraViewDialog;
