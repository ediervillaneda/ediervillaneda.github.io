import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { About } from '../interfaces/about.interface';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  cargando = true;
  about: About[] = [];

  constructor(private http: HttpClient) {
    this.cargarAbout();
  }

  private cargarAbout() {
    let date: Date;
    return new Promise<void>((resolve, rejects) => {
      this.http
        .get('https://ediervillaneda-a5ab2.firebaseio.com/about.json')
        .subscribe((resp: About[]) => {
          this.cargando = false;
          this.about = resp;
          date = new Date(resp['birthday']);
          this.about['birthday'] = date.toISOString().slice(0, 10);
          this.about['age'] = this.calcularEdad(date);
          resolve();
        });
    });
  }

  private calcularEdad(fecha: Date) {
    let hoy = new Date();
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }
}