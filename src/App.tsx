
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
import Index from "./pages/Index";
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
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/obras" element={<Obras />} />
              <Route path="/projeto-tcc-obra/*" element={<Index />} />
              <Route path="/clientes" element={<Clientes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            {/* Route to dashboard by default */}
            <Route index element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
