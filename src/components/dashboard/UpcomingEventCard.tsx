
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UpcomingEventCardProps {
  title: string;
  date: string;
  time: string;
  type: string;
  users?: string[];
}

const UpcomingEventCard = ({ title, date, time, type, users }: UpcomingEventCardProps) => {
  const typeColor = 
    type === 'Reunião' ? 'bg-blue-100 text-blue-800' : 
    type === 'Visita' ? 'bg-green-100 text-green-800' : 
    'bg-purple-100 text-purple-800';
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex flex-col items-center justify-center text-center min-w-[48px] h-[48px] bg-gray-100 rounded-md">
        <span className="text-xl font-bold">{date.split(' ')[0]}</span>
        <span className="text-xs text-muted-foreground">{date.split(' ')[1]}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{time}</p>
        {users && (
          <div className="flex -space-x-2 mt-1">
            {users.map((user: string, index: number) => (
              <Avatar key={index} className="h-6 w-6 border-2 border-background">
                <AvatarFallback>{user}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
      </div>
      <div className={`${typeColor} py-1 px-2 rounded-full text-xs font-medium`}>
        {type}
      </div>
    </div>
  );
};

export default UpcomingEventCard;
