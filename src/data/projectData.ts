
import { Github, Server, Package, Settings, FolderClosed, LayoutGrid, Code, Database } from "lucide-react";

export interface Project {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  lastUpdate: string;
  tipo: string;
}

export interface ProjectStructure {
  id: number;
  nome: string;
  tipo: string;
  icon: any;
}

export const projetosTCC: Project[] = [
  { 
    id: 1, 
    nome: "TCC - Obra", 
    descricao: "Sistema de gerenciamento de obras", 
    status: "ativo",
    lastUpdate: "15/06/2023",
    tipo: "C# MVC"
  }
];

export const estruturaProjeto: ProjectStructure[] = [
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
