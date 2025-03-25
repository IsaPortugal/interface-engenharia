
import React from 'react';
import { Building, FileCode, FileText, Database, LayoutList, Globe, Settings, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FolderStructure } from './FolderStructure';

export const ProjectTree = () => {
  const { toast } = useToast();

  // Estrutura do projeto conforme imagem enviada
  const projectStructure = [
    {
      name: "TCC - Obra",
      icon: <Building className="h-4 w-4 mr-2" />,
      items: [
        {
          name: "Connected Services",
          icon: <Server className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: []
        },
        {
          name: "Dependências",
          icon: <FileCode className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: []
        },
        {
          name: "Properties",
          icon: <Settings className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: []
        },
        {
          name: "wwwroot",
          icon: <Globe className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: []
        },
        {
          name: "Areas",
          icon: <LayoutList className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: []
        },
        {
          name: "Controllers",
          icon: <FileCode className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: [
            "HomeController.cs",
            "ObrasController.cs",
            "AtividadesController.cs",
            "MateriaisController.cs",
            "FornecedoresController.cs",
            "RelatoriosController.cs"
          ]
        },
        {
          name: "Data",
          icon: <Database className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: [
            "ApplicationDbContext.cs",
            "Migrations/"
          ]
        },
        {
          name: "Models",
          icon: <Database className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: [
            "Obra.cs", 
            "Atividade.cs", 
            "Material.cs", 
            "Fornecedor.cs", 
            "Usuario.cs", 
            "Relatorio.cs"
          ]
        },
        {
          name: "Views",
          icon: <LayoutList className="h-4 w-4 mr-2" />,
          isFolder: true,
          items: [
            "Home/",
            "Obras/",
            "Atividades/",
            "Materiais/",
            "Fornecedores/",
            "Relatorios/",
            "Shared/_Layout.cshtml"
          ]
        },
        {
          name: "appsettings.json",
          icon: <FileText className="h-4 w-4 mr-2" />,
          isFolder: false
        },
        {
          name: "Program.cs",
          icon: <FileCode className="h-4 w-4 mr-2" />,
          isFolder: false
        }
      ]
    }
  ];

  const handleFileClick = (item: string, parent?: string) => {
    toast({
      title: `Arquivo: ${item}`,
      description: parent ? `Em: ${parent}` : 'Arquivo raiz do projeto',
    });
  };

  return (
    <>
      <div className="flex items-center mb-2">
        <Building className="h-5 w-5 mr-2 text-vpro-blue" />
        <span className="font-semibold">Solução 'TCC - Obra' (1 de 1 projeto)</span>
      </div>
      
      <div className="ml-6 mt-2">
        <div className="flex items-center mb-1">
          <FileCode className="h-5 w-5 mr-2 text-vpro-orange" />
          <span className="font-medium">GitHub Actions</span>
        </div>
        
        <div className="flex flex-col ml-6 mt-1">
          {projectStructure[0].items.map((item: any, index: number) => (
            <FolderStructure 
              key={index}
              item={item}
              onFileClick={handleFileClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};
