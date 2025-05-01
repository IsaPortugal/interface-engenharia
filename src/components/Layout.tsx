
import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavBar } from './TopNavBar';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <TopNavBar />
      <main className="flex-1 p-5 flex flex-col items-center">
        <div className="w-full max-w-7xl bg-white border border-white/30 shadow-md rounded-xl p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
