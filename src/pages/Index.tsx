
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  Building, 
  Code, 
  Database, 
  FileCode, 
  FolderTree, 
  HomeIcon,
  LayoutList, 
  Globe, 
  Settings, 
  FileText,
  Server
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [activeProject, setActiveProject] = useState("TCC - Obra");

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
    <div className="container mx-auto animate-fade-in py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Building className="mr-2 h-6 w-6 text-vpro-orange" />
            Solução TCC - Obra
          </h1>
          <p className="text-muted-foreground">
            Sistema integrado para gestão de obras e construções
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={activeProject} onValueChange={setActiveProject}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Selecionar projeto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TCC - Obra">TCC - Obra (1 de 1 projeto)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="dashboard" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4 bg-vpro-lightgray p-1">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
            <HomeIcon className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="projeto" className="data-[state=active]:bg-white">
            <FolderTree className="h-4 w-4 mr-2" />
            Estrutura do Projeto
          </TabsTrigger>
          <TabsTrigger value="desenvolvimento" className="data-[state=active]:bg-white">
            <Code className="h-4 w-4 mr-2" />
            Desenvolvimento
          </TabsTrigger>
          <TabsTrigger value="tecnologias" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            Ambiente
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total de Obras</CardTitle>
                <CardDescription>Obras cadastradas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-vpro-blue">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Atividades</CardTitle>
                <CardDescription>Atividades em andamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-vpro-orange">28</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>Relatórios gerados este mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-vpro-yellow">7</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Projeto</CardTitle>
              <CardDescription>Informações sobre o TCC - Obra</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                O projeto TCC - Obra é um sistema integrado para gestão de obras e construções,
                desenvolvido como trabalho de conclusão de curso. Utilizando o padrão MVC com C#
                e ASP.NET Core, esta solução está estruturada para oferecer gerenciamento
                completo do ciclo de vida de projetos de construção.
              </p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Principais funcionalidades:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Gerenciamento de obras e projetos</li>
                  <li>Acompanhamento de atividades</li>
                  <li>Controle de materiais e fornecedores</li>
                  <li>Geração de relatórios técnicos</li>
                  <li>Dashboard para visualização de dados</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projeto">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura do Projeto</CardTitle>
              <CardDescription>Solução ASP.NET MVC</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 bg-gray-50">
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
                      <div key={index} className="mb-2">
                        {item.isFolder ? (
                          <div>
                            <div 
                              className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                              onClick={() => toast({
                                title: `Pasta: ${item.name}`,
                                description: `Clique para expandir/recolher`,
                              })}
                            >
                              {item.icon}
                              <span>{item.name}</span>
                            </div>
                            {item.items && item.items.length > 0 && (
                              <div className="ml-6 mt-1">
                                {item.items.map((subItem: string, subIndex: number) => (
                                  <div 
                                    key={subIndex}
                                    className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded mb-1"
                                    onClick={() => handleFileClick(subItem, item.name)}
                                  >
                                    <FileText className="h-4 w-4 mr-2 text-vpro-blue" />
                                    <span className="text-sm">{subItem}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div 
                            className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                            onClick={() => handleFileClick(item.name)}
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desenvolvimento">
          <Card>
            <CardHeader>
              <CardTitle>Ambiente de Desenvolvimento</CardTitle>
              <CardDescription>Ferramentas e recursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ferramentas de Desenvolvimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <Settings className="h-5 w-5 mr-2 text-vpro-blue" />
                          <span className="font-medium">Visual Studio 2022</span>
                        </div>
                        <p className="text-sm text-gray-600">IDE principal para desenvolvimento C# e ASP.NET</p>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <Server className="h-5 w-5 mr-2 text-vpro-orange" />
                          <span className="font-medium">SQL Server Management Studio</span>
                        </div>
                        <p className="text-sm text-gray-600">Gerenciamento e consulta de banco de dados</p>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <Code className="h-5 w-5 mr-2 text-vpro-yellow" />
                          <span className="font-medium">Git/GitHub</span>
                        </div>
                        <p className="text-sm text-gray-600">Controle de versão e colaboração</p>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <FileText className="h-5 w-5 mr-2 text-green-600" />
                          <span className="font-medium">Azure DevOps</span>
                        </div>
                        <p className="text-sm text-gray-600">Gestão de projetos e pipelines CI/CD</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tecnologias">
          <Card>
            <CardHeader>
              <CardTitle>Arquitetura do Sistema</CardTitle>
              <CardDescription>Visão técnica do TCC - Obra</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                
                <Separator />
                
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
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tecnologias Adicionais</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Button variant="outline" className="justify-start">
                      <Server className="mr-2 h-4 w-4" />
                      Identity para Autenticação
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Database className="mr-2 h-4 w-4" />
                      EF Core Migrations
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Relatórios PDF
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Globe className="mr-2 h-4 w-4" />
                      API REST
                    </Button>
                  </div>
                </div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
