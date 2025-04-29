
import React, { useState } from 'react';
import { DialogHeader, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface ReportFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  editMode?: boolean;
  reportData?: any;
}

const ReportForm: React.FC<ReportFormProps> = ({ onClose, onSave, editMode = false, reportData = null }) => {
  const [title, setTitle] = useState(editMode && reportData ? reportData.title : '');
  const [project, setProject] = useState(editMode && reportData ? reportData.project : '');
  const [type, setType] = useState(editMode && reportData ? reportData.type : '');
  const [description, setDescription] = useState(editMode && reportData ? reportData.description : '');
  const [date, setDate] = useState(editMode && reportData ? reportData.date : new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      project,
      type,
      description,
      date,
      author: 'EF', // Default author
      attachments: editMode && reportData ? reportData.attachments : 0
    };
    onSave(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{editMode ? 'Editar Relatório' : 'Criar Novo Relatório'}</DialogTitle>
        <DialogDescription>
          {editMode 
            ? 'Modifique as informações do relatório existente.' 
            : 'Preencha os detalhes do novo relatório.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              placeholder="Ex: Relatório Mensal - Novembro/2023" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="project">Obra</Label>
            <Select value={project} onValueChange={setProject} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a obra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Edifício Residencial Aurora">Edifício Residencial Aurora</SelectItem>
                <SelectItem value="Centro Comercial Vitória">Centro Comercial Vitória</SelectItem>
                <SelectItem value="Condomínio Park Avenue">Condomínio Park Avenue</SelectItem>
                <SelectItem value="Hospital São Lucas">Hospital São Lucas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mensal">Mensal</SelectItem>
                <SelectItem value="Semanal">Semanal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Input 
              id="date" 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              placeholder="Descreva o conteúdo e objetivo deste relatório..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="attachments">Anexar Imagens</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Arraste e solte imagens aqui ou clique para selecionar</p>
              <p className="text-xs text-muted-foreground mt-1">Suporta PNG, JPG ou JPEG (máx. 5MB cada)</p>
              <Input id="attachments" type="file" multiple className="hidden" />
            </div>
            {editMode && reportData && reportData.attachments > 0 && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  {reportData.attachments} imagens anexadas atualmente
                </p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{editMode ? 'Atualizar' : 'Criar'} Relatório</Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default ReportForm;
