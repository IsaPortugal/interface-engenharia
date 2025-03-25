
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Code, Database, FileCode, FolderTree, Home as HomeIcon, LayoutList } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("dashboard");

  // Estrutura do projeto como em um projeto MVC C#
  const projectStructure = [
    {
      name: "Models",
      icon: <Database className="h-4 w-4 mr-2" />,
      items: ["Obra.cs", "Atividade.cs", "Material.cs", "Fornecedor.cs", "Usuario.cs", "Relatorio.cs"]
    },
    {
      name: "Views",
      icon: <LayoutList className="h-4 w-4 mr-2" />,
      items: ["Home", "Obras", "Atividades", "Materiais", "Fornecedores", "Relatorios", "Shared/_Layout.cshtml"]
    },
    {
      name: "Controllers",
      icon: <FileCode className="h-4 w-4 mr-2" />,
      items: ["HomeController.cs", "ObrasController.cs", "AtividadesController.cs", "MateriaisController.cs", "FornecedoresController.cs", "RelatoriosController.cs"]
    },
    {
      name: "Services",
      icon: <Code className="h-4 w-4 mr-2" />,
      items: ["ObraService.cs", "AtividadeService.cs", "MaterialService.cs", "RelatorioService.cs", "AuthService.cs"]
    },
  ];

  const handleFileClick = (folderName: string, fileName: string) => {
    toast({
      title: `Arquivo: ${fileName}`,
      description: `Em desenvolvimento: Editor para ${folderName}/${fileName}`,
    });
  };

  return (
    <div className="container mx-auto animate-fade-in py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Building className="mr-2 h-6 w-6 text-vpro-orange" />
          Projeto TCC - Obra
        </h1>
        <p className="text-muted-foreground">
          Sistema integrado para gestão de obras e construções
        </p>
      </div>

      <Tabs defaultValue="dashboard" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4 bg-vpro-lightgray p-1">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
            <HomeIcon className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="projetos" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            Projetos
          </TabsTrigger>
          <TabsTrigger value="estrutura" className="data-[state=active]:bg-white">
            <FolderTree className="h-4 w-4 mr-2" />
            Estrutura
          </TabsTrigger>
          <TabsTrigger value="tecnologias" className="data-[state=active]:bg-white">
            <Code className="h-4 w-4 mr-2" />
            Tecnologias
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
                desenvolvido como trabalho de conclusão de curso. Ele combina diversas tecnologias
                como React no frontend e potencialmente C#, Java ou outras tecnologias no backend.
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

        <TabsContent value="projetos">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Projetos</CardTitle>
              <CardDescription>Obras cadastradas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Esta seção permitirá o gerenciamento completo de projetos de obras.
              </p>
              <div className="text-center p-6">
                <Building className="h-20 w-20 mx-auto text-vpro-orange opacity-40 mb-4" />
                <h3 className="text-lg font-semibold">Módulo em Desenvolvimento</h3>
                <p className="text-muted-foreground mt-2">
                  O módulo de gerenciamento de projetos está sendo implementado.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estrutura">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura do Projeto</CardTitle>
              <CardDescription>Organização MVC do TCC - Obra</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {projectStructure.map((folder) => (
                  <Card key={folder.name} className="overflow-hidden">
                    <CardHeader className="bg-vpro-lightgray p-3 flex flex-row items-center justify-between">
                      <div className="flex items-center">
                        {folder.icon}
                        <CardTitle className="text-sm">{folder.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <ScrollArea className="h-72">
                      <CardContent className="p-3">
                        <ul className="space-y-1">
                          {folder.items.map((item) => (
                            <li key={item}>
                              <Button 
                                variant="ghost" 
                                className="w-full justify-start text-left py-1 h-auto"
                                onClick={() => handleFileClick(folder.name, item)}
                              >
                                <FileCode className="h-4 w-4 mr-2 text-vpro-blue" />
                                {item}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </ScrollArea>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tecnologias">
          <Card>
            <CardHeader>
              <CardTitle>Tecnologias do Projeto</CardTitle>
              <CardDescription>Stack tecnológica utilizada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Frontend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold">R</span>
                        </div>
                        <div>
                          <p className="font-medium">React</p>
                          <p className="text-sm text-muted-foreground">Interface de usuário</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
                          <span className="text-cyan-600 font-semibold">Tw</span>
                        </div>
                        <div>
                          <p className="font-medium">Tailwind CSS</p>
                          <p className="text-sm text-muted-foreground">Estilização</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-semibold">Ts</span>
                        </div>
                        <div>
                          <p className="font-medium">TypeScript</p>
                          <p className="text-sm text-muted-foreground">Tipagem e lógica</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Backend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <span className="text-green-600 font-semibold">C#</span>
                        </div>
                        <div>
                          <p className="font-medium">C# / ASP.NET Core</p>
                          <p className="text-sm text-muted-foreground">API e regras de negócio</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-red-600 font-semibold">J</span>
                        </div>
                        <div>
                          <p className="font-medium">Java</p>
                          <p className="text-sm text-muted-foreground">Serviços específicos</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold">C++</span>
                        </div>
                        <div>
                          <p className="font-medium">C++</p>
                          <p className="text-sm text-muted-foreground">Componentes de alto desempenho</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Integração de Tecnologias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      O projeto utiliza uma arquitetura que permite a integração entre múltiplas tecnologias,
                      onde o frontend em React se comunica com um backend que pode incorporar
                      diferentes linguagens de programação para tarefas específicas.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>APIs RESTful para comunicação cliente-servidor</li>
                      <li>Microsserviços para isolamento de funcionalidades</li>
                      <li>Sistema de autenticação e autorização</li>
                      <li>Geração de relatórios em formato PDF/Excel</li>
                      <li>Persistência de dados em banco de dados relacional</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
