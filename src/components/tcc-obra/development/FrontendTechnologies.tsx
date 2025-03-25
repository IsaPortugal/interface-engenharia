
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FrontendTechnologies = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Frontend</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
              <span className="text-cyan-600 font-semibold">Rz</span>
            </div>
            <div>
              <p className="font-medium">Razor Views</p>
              <p className="text-sm text-muted-foreground">Templates ASP.NET</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-semibold">Bs</span>
            </div>
            <div>
              <p className="font-medium">Bootstrap</p>
              <p className="text-sm text-muted-foreground">Framework CSS</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <span className="text-yellow-600 font-semibold">Js</span>
            </div>
            <div>
              <p className="font-medium">JavaScript/jQuery</p>
              <p className="text-sm text-muted-foreground">Interatividade</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
