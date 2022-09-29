import { Education } from "./education.interfase";
import { Experience } from "./experience.interfase";

export interface Resume {
    descripcion?: string;
    education?: Education[];
    experience?: Experience;
  }
