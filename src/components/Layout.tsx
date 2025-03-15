
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { Header } from './Header';
import { cn } from '@/lib/utils';

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex">
      <SidebarNav />
      
      <div className="flex-1 ml-64"> {/* Adjust based on sidebar width */}
        <Header />
        
        <main className={cn(
          "p-6 animate-fade-in",
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
