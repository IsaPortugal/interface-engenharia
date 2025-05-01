
import React from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  client: string;
  progress: number;
  dueDate: string;
  status: 'Em andamento' | 'Atrasado' | 'Concluído';
  address?: string;
  image?: string;
}

const ProjectCard = ({ title, client, dueDate, status, address, image }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      {image && (
        <div className="relative h-40 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full"
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop";
            }}
          />
        </div>
      )}
      <CardHeader className={image ? "pb-2 pt-3" : "pb-2"}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{client}</CardDescription>
            {address && (
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {address}
              </div>
            )}
            <div className="mt-1 text-xs text-gray-600">
              {status}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Prazo: {dueDate}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
