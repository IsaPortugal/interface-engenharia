
import React from 'react';
import { Building, Database, LayoutList, FileCode } from 'lucide-react';

export const ArchitectureOverview = () => {
  return (
    <div className="border rounded-lg p-4 bg-vpro-lightgray/20">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Building className="h-5 w-5 mr-2 text-vpro-blue" />
        Arquitetura MVC
      </h3>
      <p className="text-gray-700 mb-4">
        O projeto utiliza o padrão de arquitetura Model-View-Controller (MVC) do ASP.NET Core,
        separando claramente a lógica de negócios, a apresentação e o controle de fluxo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded shadow-sm">
          <h4 className="font-medium text-vpro-blue flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Models
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Representam os dados da aplicação e a lógica de negócios
          </p>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <h4 className="font-medium text-vpro-orange flex items-center">
            <LayoutList className="h-4 w-4 mr-2" />
            Views
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Interfaces de usuário usando Razor para renderização
          </p>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <h4 className="font-medium text-vpro-yellow flex items-center">
            <FileCode className="h-4 w-4 mr-2" />
            Controllers
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Manipulam as requisições e coordenam as respostas
          </p>
        </div>
      </div>
    </div>
  );
};
