export interface Portfolio {
  descripcion?: string;
  items?: PortfolioItem[];
}

export interface PortfolioItem {
  titulo: string;
  categoria: string;
  tipo: string;
  subtipo: string;
  descripcion: string;
  tecnologias: Tecnologia[];
}

export interface Tecnologia {
  nombre: string;
  color: string;
  textColor: string;
}
