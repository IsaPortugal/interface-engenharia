
import React from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';

interface ProjectsSectionProps {
  projects: Array<{
    title: string;
    client: string;
    progress: number;
    dueDate: string;
    status: 'Em andamento' | 'Atrasado' | 'Concluído';
    address?: string;
    image?: string;
  }>;
  onViewAll?: () => void;
}

const ProjectsSection = ({ projects, onViewAll }: ProjectsSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">Obras em Andamento</h2>
        <Button variant="outline" className="text-sm" onClick={onViewAll}>
          Ver todas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
