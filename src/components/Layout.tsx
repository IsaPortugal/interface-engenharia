
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { TopNavBar } from './TopNavBar';

export function Layout() {
  const location = useLocation();
  
  // Verificar se o usuário está autenticado (simulação)
  // Em um cenário real, isso seria verificado com um token armazenado ou estado global
  const isAuthenticated = true; // Neste momento, simulamos que o usuário está autenticado

  // Redirecionar para a página de login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <TopNavBar />
      <main className="flex-1 overflow-auto p-6">
        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
