
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArchitectureOverview } from './ArchitectureOverview';
import { DataFlowDiagram } from './DataFlowDiagram';
import { AdditionalTechnologies } from './AdditionalTechnologies';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SystemArchitecture = () => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Arquitetura do Sistema</CardTitle>
        <CardDescription>Visão técnica do TCC - Obra</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ArchitectureOverview />
          <Separator />
          <DataFlowDiagram />
          <Separator />
          <AdditionalTechnologies />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="default" onClick={() => {
          toast({
            title: "Documentação",
            description: "A documentação técnica completa está em desenvolvimento.",
          });
        }}>
          Ver Documentação Completa
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SystemArchitecture;
