
import React from 'react';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';

interface DeleteObraDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteObraDialog = ({ isOpen, onOpenChange, onConfirm }: DeleteObraDialogProps) => {
  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onClose={() => onOpenChange(false)}
      onConfirm={onConfirm}
      title="Confirmar exclusão"
      description="Tem certeza que deseja excluir esta obra? Esta ação não pode ser desfeita."
    />
  );
};

export default DeleteObraDialog;
