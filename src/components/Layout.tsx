
import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavBar } from './TopNavBar';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <TopNavBar />
      <main className="flex-1 p-4 animate-fade-in flex flex-col items-center">
        <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md border border-white/30 shadow-lg rounded-xl p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
