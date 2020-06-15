import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { About } from '../interfaces/about.interface';
import { formatDate } from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class AboutService {
  cargando = true;
  about: About[] = [];

  constructor(private http: HttpClient) {
    this.cargarAbout();
  }

  private cargarAbout() {

    let date: Date;
    return new Promise((resolve, rejects) => {

      this.http.get('https://ediervillaneda-a5ab2.firebaseio.com/about.json')
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
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

}

