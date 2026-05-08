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
  private url = `${GlobalCostants.firebaseUrl}/about/skills.json`;

  constructor(private http: HttpClient) {
    this.cargarSkills();
  }

  private cargarSkills() {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Skills>(this.url).subscribe({
        next: (resp: Skills) => {
          this.skills = resp;
          this.cargando = false;
          resolve();
        },
        error: (err) => {
          this.cargando = false;
          reject(err);
        },
      });
    });
  }
}
