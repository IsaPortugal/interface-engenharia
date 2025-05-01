
import React from 'react';

interface ImageDetail {
  caption: string;
  fileName: string;
}

interface ReportGalleryProps {
  images: ImageDetail[];
}

const ReportGallery: React.FC<ReportGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) return null;
  
  return (
    <section className="bg-[#1976D2] p-4 mb-4 text-black">
      <h4 className="text-[#f97316] font-medium mb-4 pb-2 border-b">Registro Fotográfico</h4>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="border rounded-md overflow-hidden bg-white">
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
