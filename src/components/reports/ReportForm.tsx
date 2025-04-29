
import React, { useState, useEffect } from 'react';
import { DialogHeader, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { incidentsData } from '@/components/incidents/IncidentsData';
import { Slider } from '@/components/ui/slider';

interface ReportFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  editMode?: boolean;
  reportData?: any;
}

interface ImageUpload {
  file: File;
  caption: string;
  previewUrl?: string;
}

const ReportForm: React.FC<ReportFormProps> = ({ onClose, onSave, editMode = false, reportData = null }) => {
  const [title, setTitle] = useState(editMode && reportData ? reportData.title : '');
  const [project, setProject] = useState(editMode && reportData ? reportData.project : '');
  const [type, setType] = useState(editMode && reportData ? reportData.type : '');
  const [description, setDescription] = useState(editMode && reportData ? reportData.description : '');
  const [date, setDate] = useState(editMode && reportData ? reportData.date : new Date().toISOString().split('T')[0]);
  const [progress, setProgress] = useState(editMode && reportData ? reportData.progress || 0 : 0);
  const [nextSteps, setNextSteps] = useState(editMode && reportData ? reportData.nextSteps || '' : '');
  const [imageUploads, setImageUploads] = useState<ImageUpload[]>([]);
  const [projectIncidents, setProjectIncidents] = useState<any[]>([]);

  // Find incidents related to the selected project
  useEffect(() => {
    if (project) {
      const relatedIncidents = incidentsData.filter(incident => incident.project === project);
      setProjectIncidents(relatedIncidents);
    } else {
      setProjectIncidents([]);
    }
  }, [project]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: ImageUpload[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const previewUrl = URL.createObjectURL(file);
      newFiles.push({ 
        file, 
        caption: '', 
        previewUrl 
      });
    }

    setImageUploads([...imageUploads, ...newFiles]);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const updatedUploads = [...imageUploads];
    updatedUploads[index].caption = caption;
    setImageUploads(updatedUploads);
  };

  const handleRemoveImage = (index: number) => {
    const updatedUploads = [...imageUploads];
    if (updatedUploads[index].previewUrl) {
      URL.revokeObjectURL(updatedUploads[index].previewUrl!);
    }
    updatedUploads.splice(index, 1);
    setImageUploads(updatedUploads);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      project,
      type,
      description,
      date,
      author: 'EF', // Default author
      attachments: imageUploads.length,
      progress,
      nextSteps,
      incidents: projectIncidents,
      imageDetails: imageUploads.map(upload => ({
        caption: upload.caption,
        fileName: upload.file.name
      }))
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
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
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
            {type && (
              <p className="text-sm text-muted-foreground">
                {type === "Semanal" 
                  ? "O relatório semanal incluirá apenas os dados registrados na última semana." 
                  : "O relatório mensal incluirá um resumo de todos os dados registrados no mês."}
              </p>
            )}
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
            <Label>Progresso da Obra (%)</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider
                  value={[progress]}
                  onValueChange={(values) => setProgress(values[0])}
                  max={100}
                  step={1}
                />
              </div>
              <div className="w-12 text-center font-medium">{progress}%</div>
            </div>
          </div>
          
          {projectIncidents.length > 0 && (
            <div className="grid gap-2">
              <Label>Incidentes Relacionados</Label>
              <div className="border rounded-md p-4 bg-muted/30 space-y-3">
                {projectIncidents.map((incident, index) => (
                  <div key={index} className="p-3 bg-background border rounded-md">
                    <h4 className="font-medium">{incident.title}</h4>
                    <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                      <span>Data: {incident.date}</span>
                      <span>•</span>
                      <span>Status: {incident.status}</span>
                    </div>
                    <p className="text-sm mt-2">{incident.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="nextSteps">Próximas Etapas</Label>
            <Textarea 
              id="nextSteps" 
              placeholder="Descreva as próximas etapas planejadas para a obra..." 
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="attachments">Anexar Imagens</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => document.getElementById('attachments')?.click()}>
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Arraste e solte imagens aqui ou clique para selecionar</p>
              <p className="text-xs text-muted-foreground mt-1">Suporta PNG, JPG ou JPEG (máx. 5MB cada)</p>
              <Input 
                id="attachments" 
                type="file" 
                multiple 
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
              />
            </div>
            
            {imageUploads.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {imageUploads.map((upload, index) => (
                  <div key={index} className="border rounded p-3">
                    <div className="relative mb-2">
                      <img 
                        src={upload.previewUrl} 
                        alt={`Preview ${index}`}
                        className="w-full h-40 object-cover rounded"
                      />
                      <button 
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                    <Textarea
                      placeholder="Adicione uma legenda para esta imagem..."
                      value={upload.caption}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {editMode && reportData && reportData.attachments > 0 && imageUploads.length === 0 && (
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
