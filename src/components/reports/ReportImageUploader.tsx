
import React from 'react';
import { Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ImageUpload {
  file: File;
  caption: string;
  previewUrl?: string;
}

interface ReportImageUploaderProps {
  imageUploads: ImageUpload[];
  setImageUploads: React.Dispatch<React.SetStateAction<ImageUpload[]>>;
}

const ReportImageUploader: React.FC<ReportImageUploaderProps> = ({ 
  imageUploads,
  setImageUploads
}) => {
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

  return (
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
    </div>
  );
};

export default ReportImageUploader;
