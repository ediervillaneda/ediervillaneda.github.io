import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { GlobalCostants } from '../global.constants';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  cargando = true;
  hero: Hero = { nombre: '', social: [] };
  private url = `${GlobalCostants.firebaseUrl}/hero.json`;

  constructor(private http: HttpClient) {
    this.cargarHero();
  }

  private cargarHero() {
    return new Promise<void>((resolve, rejects) => {
      this.http.get<Hero>(this.url).subscribe((resp: Hero) => {
        this.hero = resp;
        this.cargando = false;
        resolve();
      });
    });
  }
}
