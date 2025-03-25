
import React from 'react';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FolderStructureProps {
  item: {
    name: string;
    icon: React.ReactNode;
    isFolder?: boolean;
    items?: string[];
  };
  onFileClick: (item: string, parent?: string) => void;
}

export const FolderStructure: React.FC<FolderStructureProps> = ({ item, onFileClick }) => {
  const { toast } = useToast();
  
  return (
    <div className="mb-2">
      {item.isFolder ? (
        <div>
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={() => toast({
              title: `Pasta: ${item.name}`,
              description: `Clique para expandir/recolher`,
            })}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
          {item.items && item.items.length > 0 && (
            <div className="ml-6 mt-1">
              {item.items.map((subItem: string, subIndex: number) => (
                <div 
                  key={subIndex}
                  className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded mb-1"
                  onClick={() => onFileClick(subItem, item.name)}
                >
                  <FileText className="h-4 w-4 mr-2 text-vpro-blue" />
                  <span className="text-sm">{subItem}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div 
          className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
          onClick={() => onFileClick(item.name)}
        >
          {item.icon}
          <span>{item.name}</span>
        </div>
      )}
    </div>
  );
};
