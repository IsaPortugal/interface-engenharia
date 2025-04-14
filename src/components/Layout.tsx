
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { Header } from './Header';
import { cn } from '@/lib/utils';

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      <div className={cn(
        "flex-1 transition-all duration-300",
        sidebarCollapsed ? "mr-16" : "mr-64"
      )}>
        <Header />
        
        <main className="p-6 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-md border border-white/30 shadow-lg rounded-xl p-6">
            <Outlet />
          </div>
        </main>
      </div>

      <SidebarNav 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
    </div>
  );
}
