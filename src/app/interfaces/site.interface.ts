import { About } from './about.interface';
import { Hero } from './hero.interface';
import { Resumen } from './resumen.interfase';
import { Social } from './social.interface';

export interface Site {
  about?: About;
  hero?: Hero;
  resumen?: Resumen;
}
