
import React from 'react';

export const DataFlowDiagram = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Diagrama de Fluxo de Dados</h3>
      <div className="border rounded-lg p-6 flex justify-center">
        <div className="grid grid-cols-1 gap-6 max-w-3xl w-full">
          <div className="flex justify-between items-center">
            <div className="border rounded p-3 bg-blue-50 w-32 text-center">
              <p className="font-medium">Cliente</p>
            </div>
            <div className="border-t-2 border-dashed w-32 border-gray-400"></div>
            <div className="border rounded p-3 bg-green-50 w-32 text-center">
              <p className="font-medium">Controller</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="border-l-2 border-dashed h-8 border-gray-400"></div>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="border rounded p-3 bg-orange-50 w-32 text-center">
              <p className="font-medium">Service</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="border-l-2 border-dashed h-8 border-gray-400"></div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="border rounded p-3 bg-purple-50 w-32 text-center">
              <p className="font-medium">Repository</p>
            </div>
            <div className="border-t-2 border-dashed w-32 border-gray-400"></div>
            <div className="border rounded p-3 bg-yellow-50 w-32 text-center">
              <p className="font-medium">Model</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="border-l-2 border-dashed h-8 border-gray-400"></div>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="border rounded p-3 bg-red-50 w-32 text-center">
              <p className="font-medium">Database</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
