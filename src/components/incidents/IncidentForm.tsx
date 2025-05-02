
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface IncidentFormProps {
  onClose: () => void;
  incident?: any;
  isEdit?: boolean;
}

const IncidentForm = ({ onClose, incident, isEdit = false }: IncidentFormProps) => {
  return (
    <>
      <DialogHeader className="text-center">
        <DialogTitle>{isEdit ? "Editar Incidente" : "Registrar Novo Incidente"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Digite o título do incidente" defaultValue={incident?.title || ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project">Obra</Label>
          <Select defaultValue={incident?.project || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a obra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aurora">Edifício Residencial Aurora</SelectItem>
              <SelectItem value="vitoria">Centro Comercial Vitória</SelectItem>
              <SelectItem value="park">Condomínio Park Avenue</SelectItem>
              <SelectItem value="hospital">Hospital São Lucas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="assigned">Responsável</Label>
          <Select defaultValue={incident?.assignedTo || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o responsável" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ef">Eng. Fiscal (EF)</SelectItem>
              <SelectItem value="rs">Roberto Silva (RS)</SelectItem>
              <SelectItem value="tc">Técnico Carlos (TC)</SelectItem>
              <SelectItem value="mf">Maria Fernandes (MF)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={incident?.status === "Resolvido" ? "resolvido" : "em-aberto"}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="em-aberto">Em aberto</SelectItem>
              <SelectItem value="resolvido">Resolvido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Data</Label>
          <Input 
            id="date" 
            type="date" 
            className="date-input-no-icon" 
            defaultValue={incident?.date ? incident.date.split('/').reverse().join('-') : ""} 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" placeholder="Descreva o incidente..." defaultValue={incident?.description || ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Imagens</Label>
          <Input id="image" type="file" multiple />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
        <Button type="submit">{isEdit ? "Salvar Alterações" : "Registrar Incidente"}</Button>
      </DialogFooter>
    </>
  );
};

export default IncidentForm;
