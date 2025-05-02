
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { TopNavBar } from './TopNavBar';

export function Layout() {
  const location = useLocation();
  
  // Always allow access to the layout and its child routes
  // Removing the authentication check that was redirecting to login
  
  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <TopNavBar />
      <Header />
      <main className="flex-1 overflow-auto p-6">
        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
