
import React, { useState } from 'react';
import { scheduleData } from '@/data/scheduleData';
import ScheduleHeader from '@/components/schedule/ScheduleHeader';
import ScheduleSearch from '@/components/schedule/ScheduleSearch';
import ScheduleTabs from '@/components/schedule/ScheduleTabs';

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filtering schedule events
  const filteredEvents = scheduleData.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <ScheduleHeader dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <ScheduleSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ScheduleTabs filteredEvents={filteredEvents} />
    </div>
  );
};

export default Schedule;
