
import React from 'react';

interface UpcomingEventCardProps {
  title: string;
  date: string;
  time: string;
  location?: string;
}

const UpcomingEventCard = ({ title, date, time, location }: UpcomingEventCardProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex flex-col items-center justify-center text-center min-w-[48px] h-[48px] bg-gray-100 rounded-md">
        <span className="text-xl font-bold">{date.split(' ')[0]}</span>
        <span className="text-xs text-muted-foreground">{date.split(' ')[1]}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>{time}</p>
          {location && <p className="text-xs">{location}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
