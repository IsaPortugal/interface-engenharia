
import React, { useState } from 'react';
import { scheduleData, ScheduleEvent } from '@/data/scheduleData';
import ScheduleHeader from '@/components/schedule/ScheduleHeader';
import ScheduleSearch from '@/components/schedule/ScheduleSearch';
import ScheduleTabs from '@/components/schedule/ScheduleTabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ScheduleForm from '@/components/schedule/ScheduleForm';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ScheduleEvent | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filtering schedule events
  const filteredEvents = scheduleData.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.responsible.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewEvent = (event: ScheduleEvent) => {
    setCurrentEvent(event);
    setIsViewMode(true);
    setDialogOpen(true);
  };

  const handleEditEvent = (event: ScheduleEvent) => {
    setCurrentEvent(event);
    setIsEditMode(true);
    setDialogOpen(true);
  };

  const handleDeleteEvent = (event: ScheduleEvent) => {
    setCurrentEvent(event);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Logic to delete the event would go here
    console.log(`Deleting event: ${currentEvent?.id}`);
    setDeleteDialogOpen(false);
    setCurrentEvent(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setIsViewMode(false);
    setIsEditMode(false);
    setCurrentEvent(null);
  };

  return (
    <div className="container mx-auto py-6">
      <ScheduleHeader dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <ScheduleSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ScheduleTabs 
        filteredEvents={filteredEvents} 
        onViewEvent={handleViewEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          {isViewMode ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">{currentEvent?.title}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Obra</p>
                  <p>{currentEvent?.project}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Data</p>
                    <p>{currentEvent?.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Hora</p>
                    <p>{currentEvent?.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Local</p>
                  <p>{currentEvent?.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tipo</p>
                  <p>{currentEvent?.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Responsável</p>
                  <p>{currentEvent?.responsible}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p>{currentEvent?.status === 'pendente' ? 'Pendente' : 'Concluído'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Descrição</p>
                  <p>{currentEvent?.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <ScheduleForm 
              onClose={handleCloseDialog} 
              event={currentEvent} 
              isEdit={isEditMode} 
            />
          )}
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita."
      />
    </div>
  );
};

export default Schedule;
