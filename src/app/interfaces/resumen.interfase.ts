import { Education } from "./education.interfase";
import { Experience } from "./experience.interfase";

export interface Resumen {
    descripcion?: string;
    education?: Education[];
    experience?: Experience;
  }