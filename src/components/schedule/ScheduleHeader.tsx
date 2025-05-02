
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, Plus } from 'lucide-react';
import ScheduleForm from './ScheduleForm';

interface ScheduleHeaderProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ dialogOpen, setDialogOpen }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">
          <CalendarIcon className="inline mr-2 h-6 w-6 text-blue-500" />
          Agendamentos
        </h1>
        <p className="text-muted-foreground">Gerencie seus compromissos relacionados às obras</p>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> 
            Novo Agendamento
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-hidden">
          <ScheduleForm onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleHeader;
