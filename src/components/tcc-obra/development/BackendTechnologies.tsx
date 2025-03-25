
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BackendTechnologies = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Backend</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-semibold">C#</span>
            </div>
            <div>
              <p className="font-medium">ASP.NET Core MVC</p>
              <p className="text-sm text-muted-foreground">Framework principal</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <span className="text-purple-600 font-semibold">EF</span>
            </div>
            <div>
              <p className="font-medium">Entity Framework Core</p>
              <p className="text-sm text-muted-foreground">ORM para acesso a dados</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
              <span className="text-orange-600 font-semibold">SQL</span>
            </div>
            <div>
              <p className="font-medium">SQL Server</p>
              <p className="text-sm text-muted-foreground">Banco de dados relacional</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
