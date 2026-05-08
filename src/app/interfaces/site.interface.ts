import { About } from './about.interface';
import { Hero } from './hero.interface';
import { Resume } from './resume.interfase';

export interface Site {
  about?: About;
  hero?: Hero;
  resumen?: Resume;
}
