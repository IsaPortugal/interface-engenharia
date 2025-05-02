
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
    <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <TopNavBar />
      <main className="flex-1 p-5 flex flex-col overflow-y-auto">
        <div className="w-full max-w-7xl bg-white border border-white/30 shadow-md rounded-xl p-5 mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
