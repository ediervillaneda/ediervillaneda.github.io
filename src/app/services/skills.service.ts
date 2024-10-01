import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Skills } from '../interfaces/skills.interfase';
import { GlobalCostants } from '../global.constants';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  cargando = true;
  skills: Skills = {
    descripcion: ''
  };
  private url = `${GlobalCostants.firebaseUrl}//about/skills.json`;
  // private url = `${GlobalCostants.firebaseUrl}/hero.json`;

  constructor(private http: HttpClient) {
    this.cargarSkills();
  }

  private cargarSkills() {
    return new Promise<void>((resolve, rejects) => {
      this.http.get<Skills>(this.url).subscribe((resp: Skills) => {
        this.skills = resp;
        this.cargando = false;
        resolve();
      });
    });
  }
}
