
import React from 'react';
import { ProjectStats } from './ProjectStats';
import { ProjectSummary } from './ProjectSummary';

const ProjectDashboard = () => {
  return (
    <div className="space-y-4">
      <ProjectStats />
      <ProjectSummary />
    </div>
  );
};

export default ProjectDashboard;
