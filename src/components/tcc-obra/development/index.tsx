
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackendTechnologies } from './BackendTechnologies';
import { FrontendTechnologies } from './FrontendTechnologies';
import { DevelopmentTools } from './DevelopmentTools';

const DevelopmentEnvironment = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ambiente de Desenvolvimento</CardTitle>
        <CardDescription>Ferramentas e recursos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BackendTechnologies />
          <FrontendTechnologies />
          <DevelopmentTools />
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentEnvironment;
