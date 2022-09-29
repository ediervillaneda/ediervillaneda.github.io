import { About } from './about.interface';
import { Hero } from './hero.interface';
import { Resumen } from './resume.interfase';

export interface Site {
  about?: About;
  hero?: Hero;
  resumen?: Resumen;
}
