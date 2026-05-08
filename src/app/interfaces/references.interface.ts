export interface References {
  descripcion?: string;
  referencias?: ReferenceItem[];
}

export interface ReferenceItem {
  nombre: string;
  cargo: string;
  empresa: string;
  testimonio: string;
}
