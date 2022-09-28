import { Facts } from './facts.interfase';
import { Skills } from './skills.interfase';

export interface About {
  age?: string;
  birthday?: Date;
  city?: string;
  country?: string;
  descripcion?: string[];
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
