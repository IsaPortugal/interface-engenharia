import React from "react";
import { Link } from "react-router-dom";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  ChevronRight, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Clock, 
  CheckCircle2,
  FolderClosed,
  Code,
  Database,
  LayoutGrid,
  Settings,
  Github,
  Server,
  Package
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockData = [
  { name: "Jan", visitas: 400, incidentes: 240, relatorios: 180 },
  { name: "Fev", visitas: 300, incidentes: 139, relatorios: 220 },
  { name: "Mar", visitas: 500, incidentes: 350, relatorios: 250 },
  { name: "Abr", visitas: 780, incidentes: 390, relatorios: 330 },
  { name: "Mai", visitas: 600, incidentes: 300, relatorios: 290 },
  { name: "Jun", visitas: 700, incidentes: 200, relatorios: 320 },
];

const progressData = [
  { name: "Projeto A", progresso: 75, meta: 100 },
  { name: "Projeto B", progresso: 85, meta: 100 },
  { name: "Projeto C", progresso: 35, meta: 100 },
  { name: "Projeto D", progresso: 90, meta: 100 },
];

const activityItems = [
  { id: 1, title: "Relatório diário concluído", time: "09:15", status: "success", icon: CheckCircle2 },
  { id: 2, title: "Incidente reportado", time: "11:30", status: "warning", icon: AlertTriangle },
  { id: 3, title: "Visita técnica agendada", time: "13:45", status: "info", icon: Calendar },
  { id: 4, title: "Análise de métricas", time: "16:20", status: "success", icon: Activity },
];

const projetosTCC = [
  { 
    id: 1, 
    nome: "TCC - Obra", 
    descricao: "Sistema de gerenciamento de obras", 
    status: "ativo",
    lastUpdate: "15/06/2023",
    tipo: "C# MVC"
  }
];

const estruturaProjeto = [
  { id: 1, nome: "GitHub Actions", tipo: "integracao", icon: Github },
  { id: 2, nome: "Connected Services", tipo: "servico", icon: Server },
  { id: 3, nome: "Dependências", tipo: "pacote", icon: Package },
  { id: 4, nome: "Properties", tipo: "configuracao", icon: Settings },
  { id: 5, nome: "wwwroot", tipo: "estatico", icon: FolderClosed },
  { id: 6, nome: "Areas", tipo: "modulo", icon: LayoutGrid },
  { id: 7, nome: "Controllers", tipo: "codigo", icon: Code },
  { id: 8, nome: "Data", tipo: "dados", icon: Database },
  { id: 9, nome: "Models", tipo: "codigo", icon: Code },
  { id: 10, nome: "Views", tipo: "interface", icon: LayoutGrid },
  { id: 11, nome: "appsettings.json", tipo: "configuracao", icon: Settings },
  { id: 12, nome: "Program.cs", tipo: "codigo", icon: Code },
];

const Home = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-vpro-blue to-vpro-orange rounded-xl p-8 text-white mb-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">Bem-vindo ao Dashboard VPRO</h1>
          <p className="text-xl opacity-90 mb-6">
            Monitore e gerencie todos os seus projetos em um só lugar com eficiência e produtividade.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-white text-vpro-orange hover:bg-vpro-yellow hover:text-black">
              Iniciar agora
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              Ver tutorial
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="projetos">Projetos</TabsTrigger>
          <TabsTrigger value="estrutura">Estrutura</TabsTrigger>
          <TabsTrigger value="atividades">Atividades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Visitas Técnicas</CardTitle>
                <CardDescription>Total neste mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-vpro-orange">24</div>
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>12% acima da média</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Incidentes</CardTitle>
                <CardDescription>Reportados neste mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-vpro-blue">7</div>
                <div className="flex items-center text-amber-500 text-sm mt-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>2 pendentes de resolução</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Relatórios</CardTitle>
                <CardDescription>Completados neste mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-vpro-yellow">18</div>
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>100% entregues no prazo</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Agendamentos</CardTitle>
                <CardDescription>Próximos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">5</div>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Próximo: Amanhã, 10:00</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>Desempenho mensal das atividades principais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="visitas" stroke="#0099FF" strokeWidth={2} />
                      <Line type="monotone" dataKey="incidentes" stroke="#FF6600" strokeWidth={2} />
                      <Line type="monotone" dataKey="relatorios" stroke="#FFD700" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Link to="/reports" className="text-vpro-blue hover:text-vpro-orange transition-colors">
                  Ver relatório completo
                  <ChevronRight className="inline ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>Últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="flex items-start">
                        <div className={`flex items-center justify-center h-9 w-9 rounded-full mr-3 ${
                          item.status === 'success' ? 'bg-green-100 text-green-600' :
                          item.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="ghost" className="text-vpro-blue hover:text-vpro-orange hover:bg-vpro-lightgray w-full justify-center">
                  Ver todas as atividades
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Progresso dos Projetos</CardTitle>
                <CardDescription>Situação atual dos projetos principais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={progressData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="progresso" fill="#0099FF" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Distribuição por Tipo</CardTitle>
                <CardDescription>Divisão das atividades mensais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="visitas" 
                        stackId="1"
                        stroke="#0099FF" 
                        fill="#0099FF" 
                        fillOpacity={0.6} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="incidentes" 
                        stackId="1"
                        stroke="#FF6600" 
                        fill="#FF6600" 
                        fillOpacity={0.6} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="relatorios" 
                        stackId="1"
                        stroke="#FFD700" 
                        fill="#FFD700" 
                        fillOpacity={0.6} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projetos" className="space-y-6">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Projetos</CardTitle>
                  <CardDescription>Gerenciamento de projetos ativos</CardDescription>
                </div>
                <Button className="bg-vpro-orange hover:bg-vpro-yellow hover:text-black">
                  Novo Projeto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {projetosTCC.map(projeto => (
                <div key={projeto.id} className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-vpro-blue flex items-center">
                        <FolderClosed className="h-5 w-5 mr-2 text-vpro-orange" />
                        {projeto.nome}
                        <Badge className="ml-3 bg-green-100 text-green-700">{projeto.status}</Badge>
                      </h3>
                      <p className="text-gray-600 mt-1">{projeto.descricao}</p>
                      
                      <div className="flex mt-3 space-x-4">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Code className="h-4 w-4 mr-1" />
                          <span>{projeto.tipo}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Atualizado: {projeto.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="text-vpro-blue border-vpro-blue hover:bg-vpro-blue hover:text-white">
                      Abrir Projeto
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="estrutura" className="space-y-6">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Estrutura de Projeto: TCC - Obra</CardTitle>
                  <CardDescription>Visualização da hierarquia do projeto</CardDescription>
                </div>
                <Button variant="outline" className="text-vpro-blue border-vpro-blue hover:bg-vpro-blue hover:text-white">
                  Expandir Tudo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4">
                <div className="mb-3 pl-2 flex items-center text-lg font-semibold">
                  <FolderClosed className="h-5 w-5 mr-2 text-vpro-orange" />
                  Solução 'TCC - Obra' (1 de 1 projeto)
                </div>
                
                <div className="pl-6 space-y-3">
                  <div className="flex items-center border-l border-dashed border-gray-400 pl-4 py-1">
                    <Github className="h-5 w-5 mr-2 text-gray-700" />
                    <span>GitHub Actions</span>
                  </div>
                  
                  <div className="flex items-center border-l border-dashed border-gray-400 pl-4 py-1 font-medium">
                    <FolderClosed className="h-5 w-5 mr-2 text-vpro-yellow" />
                    <span>TCC - Obra</span>
                  </div>
                  
                  <div className="pl-8">
                    {estruturaProjeto.slice(1).map(item => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id} className="flex items-center border-l border-dashed border-gray-400 pl-4 py-1 mb-2">
                          <Icon className={`h-5 w-5 mr-2 ${
                            item.tipo === 'codigo' ? 'text-vpro-blue' :
                            item.tipo === 'dados' ? 'text-green-600' :
                            item.tipo === 'interface' ? 'text-purple-600' :
                            item.tipo === 'configuracao' ? 'text-amber-600' :
                            'text-gray-600'
                          }`} />
                          <span>{item.nome}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button className="bg-vpro-blue hover:bg-vpro-orange w-full justify-center">
                Gerenciar Componentes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="atividades" className="space-y-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Atividades do Projeto</CardTitle>
              <CardDescription>Histórico de ações no projeto TCC - Obra</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full mr-3 bg-blue-100 text-blue-600">
                    <Github className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Commit: Atualização do Model de Obras</p>
                    <p className="text-sm text-gray-600">Modificações em Models/Obra.cs</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Hoje, 14:35</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full mr-3 bg-green-100 text-green-600">
                    <Code className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Nova View: ListaObras</p>
                    <p className="text-sm text-gray-600">Adicionada view para listagem de obras</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Ontem, 16:20</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full mr-3 bg-amber-100 text-amber-600">
                    <Database className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Atualização de Migrations</p>
                    <p className="text-sm text-gray-600">Modificações na estrutura do banco de dados</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>15/06/2023, 09:45</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full mr-3 bg-purple-100 text-purple-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Atualização de Dependências</p>
                    <p className="text-sm text-gray-600">Entity Framework Core atualizado para v7.0.5</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>10/06/2023, 11:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="ghost" className="text-vpro-blue hover:text-vpro-orange hover:bg-vpro-lightgray w-full justify-center">
                Ver histórico completo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
