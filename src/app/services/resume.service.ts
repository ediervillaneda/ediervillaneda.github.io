import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalCostants } from '../global.constants';
import { Resume } from '../interfaces/resume.interfase';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  cargando = true;
  resume: Resume = {
    descripcion: '',
    educations: [],
    experiences: [],
  };
  private url = `${GlobalCostants.firebaseUrl}/resumen.json`;

  constructor(private http: HttpClient) {
    this.cargarResumen();
  }
  cargarResumen() {
    return new Promise<void>((resolve, rejects) => {
      this.http.get<Resume>(this.url).subscribe((resp: Resume) => {
        this.resume = resp;
        this.cargando = false;
        resolve();
      });
    });
  }
}
