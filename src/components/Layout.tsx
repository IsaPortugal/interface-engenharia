
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { TopNavBar } from './TopNavBar';

export function Layout() {
  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <TopNavBar />
      <main className="flex-1 overflow-auto">
        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
