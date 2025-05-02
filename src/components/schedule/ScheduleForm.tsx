
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ScheduleFormProps {
  onClose: () => void;
  event?: any;
  isEdit?: boolean;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ onClose, event, isEdit = false }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date || '');
  const [time, setTime] = useState(event?.time || '');
  const [project, setProject] = useState(event?.project || '');
  const [type, setType] = useState(event?.type || '');
  const [location, setLocation] = useState(event?.location || '');
  const [description, setDescription] = useState(event?.description || '');
  const [responsible, setResponsible] = useState(event?.responsible || '');
  const [status, setStatus] = useState(event?.status || 'pendente');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for saving the form data would go here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="max-h-full">
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Editar Agendamento' : 'Agendar Novo Compromisso'}</DialogTitle>
        <DialogDescription>
          Preencha os detalhes do agendamento.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 overflow-y-auto pr-1">
        <div className="grid gap-2">
          <Label htmlFor="title">Título</Label>
          <Input 
            id="title" 
            placeholder="Ex: Visita técnica" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="text"
              placeholder="DD/MM/AAAA"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="time">Horário</Label>
            <Input
              id="time"
              type="text"
              placeholder="HH:MM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="project">Obra</Label>
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a obra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aurora">Edifício Residencial Aurora</SelectItem>
              <SelectItem value="vitoria">Centro Comercial Vitória</SelectItem>
              <SelectItem value="park">Condomínio Park Avenue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="type">Tipo</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Visita">Visita</SelectItem>
              <SelectItem value="Reunião">Reunião</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">Local</Label>
          <Input 
            id="location" 
            placeholder="Endereço ou nome do local" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="responsible">Responsável</Label>
          <Input 
            id="responsible" 
            placeholder="Nome do responsável" 
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea 
            id="description" 
            placeholder="Descreva o objetivo deste agendamento..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter className="mt-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
        <Button type="submit">{isEdit ? 'Salvar' : 'Agendar'}</Button>
      </DialogFooter>
    </form>
  );
};

export default ScheduleForm;
