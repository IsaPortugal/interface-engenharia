
import React from 'react';

interface ImageDetail {
  caption: string;
  fileName: string;
}

interface ReportGalleryProps {
  images: ImageDetail[];
}

const ReportGallery: React.FC<ReportGalleryProps> = ({ images }) => {
  return (
    <section>
      <h4 className="text-base font-medium mb-2">Registro Fotográfico</h4>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            <img 
              src={img.fileName.startsWith('/') ? img.fileName : '/placeholder.svg'} 
              alt={`Imagem da obra ${index + 1}`} 
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div className="p-2 text-sm text-center text-gray-600">
              {img.caption || `Foto ${index + 1}`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportGallery;
