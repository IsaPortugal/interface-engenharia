
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportFormFieldsProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  project: string;
  setProject: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  activitiesPerformed: string;
  setActivitiesPerformed: React.Dispatch<React.SetStateAction<string>>;
  weatherConditions: string;
  setWeatherConditions: React.Dispatch<React.SetStateAction<string>>;
  nextSteps: string;
  setNextSteps: React.Dispatch<React.SetStateAction<string>>;
}

const ReportFormFields: React.FC<ReportFormFieldsProps> = ({
  title, setTitle,
  project, setProject,
  type, setType,
  description, setDescription,
  date, setDate,
  activitiesPerformed, setActivitiesPerformed,
  weatherConditions, setWeatherConditions,
  nextSteps, setNextSteps
}) => {
  return (
    <>
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
          className="date-input-no-icon"
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
        <Label htmlFor="activitiesPerformed">Atividades Realizadas</Label>
        <Textarea 
          id="activitiesPerformed" 
          placeholder="Descreva as atividades realizadas neste período..." 
          value={activitiesPerformed}
          onChange={(e) => setActivitiesPerformed(e.target.value)}
          rows={5}
          required
        />
      </div>
          
      <div className="grid gap-2">
        <Label htmlFor="weatherConditions">Condições Climáticas</Label>
        <Textarea 
          id="weatherConditions" 
          placeholder="Descreva as condições climáticas durante o período..." 
          value={weatherConditions}
          onChange={(e) => setWeatherConditions(e.target.value)}
          rows={3}
        />
      </div>
          
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
    </>
  );
};

export default ReportFormFields;
