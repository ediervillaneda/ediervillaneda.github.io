import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  cargando = true;
  hero: Hero[] = [];

  constructor(private http: HttpClient) {
    this.cargarHero();
  }

  private cargarHero() {
    return new Promise<void>((resolve, rejects) => {
      this.http
        .get('https://ediervillaneda-a5ab2.firebaseio.com/hero.json')
        .subscribe((resp: Hero[]) => {
          this.hero = resp;
          this.cargando = false;
          resolve();
        });
    });
  }
}
