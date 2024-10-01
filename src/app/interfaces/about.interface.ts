import { Facts } from './facts.interfase';
import { Skills } from './skills.interfase';

export interface About {
  age?: number;
  birthday: string;
  city?: string;
  country?: string;
  descripcion?: string[];
  descripcion2?: string[];
  descripcion3?: string[];
  email?: string;
  facts?: Facts;
  skills?: Skills;
  imagen?: string;
  phone?: string;
  titulo?: string;
  degree?: string;
  website?: string;
  freelance?: string;
}
