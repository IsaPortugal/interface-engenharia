
import React, { useState, useEffect } from 'react';
import { DialogHeader, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { incidentsData } from '@/components/incidents/IncidentsData';
import ReportFormFields from './ReportFormFields';
import ReportImageUploader from './ReportImageUploader';
import RelatedIncidents from './RelatedIncidents';

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
  const [activitiesPerformed, setActivitiesPerformed] = useState(editMode && reportData ? reportData.activitiesPerformed || '' : '');
  const [weatherConditions, setWeatherConditions] = useState(editMode && reportData ? reportData.weatherConditions || '' : '');
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
      activitiesPerformed,
      weatherConditions,
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
          <ReportFormFields
            title={title}
            setTitle={setTitle}
            project={project}
            setProject={setProject}
            type={type}
            setType={setType}
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            activitiesPerformed={activitiesPerformed}
            setActivitiesPerformed={setActivitiesPerformed}
            weatherConditions={weatherConditions}
            setWeatherConditions={setWeatherConditions}
            nextSteps={nextSteps}
            setNextSteps={setNextSteps}
          />
          
          <RelatedIncidents projectIncidents={projectIncidents} />
          
          <ReportImageUploader 
            imageUploads={imageUploads}
            setImageUploads={setImageUploads}
          />
          
          {editMode && reportData && reportData.attachments > 0 && imageUploads.length === 0 && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                {reportData.attachments} imagens anexadas atualmente
              </p>
            </div>
          )}
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
