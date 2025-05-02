
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Reports from "./pages/Reports";
import Incidents from "./pages/Incidents";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Obras from "./pages/Obras";
import Clientes from './pages/Clientes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/reports" element={<Reports />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/obras" element={<Obras />} />
              <Route path="/clientes" element={<Clientes />} />
              {/* Redirecionamento padrão para relatórios */}
              <Route path="/" element={<Navigate to="/reports" replace />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
