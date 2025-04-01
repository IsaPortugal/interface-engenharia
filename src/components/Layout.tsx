
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { Header } from './Header';
import { cn } from '@/lib/utils';

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen main-gradient flex">
      <SidebarNav 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={cn(
        "flex-1 transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <Header />
        
        <main className="p-6 animate-fade-in">
          <div className="glass-card p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
