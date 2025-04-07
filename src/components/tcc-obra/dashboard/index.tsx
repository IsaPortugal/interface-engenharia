
import React from 'react';
import { ProjectStats } from './ProjectStats';
import { ProjectSummary } from './ProjectSummary';

// Componente Dashboard simplificado
const ProjectDashboard = () => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Dashboard do Projeto</h1>
      <ProjectStats />
      <ProjectSummary />
    </div>
  );
};

export default ProjectDashboard;
