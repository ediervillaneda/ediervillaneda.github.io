import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  cargando = true;
  hero: Hero[] = [];
  private heroUrl = 'https://ediervillaneda-a5ab2.firebaseio.com/hero.json';

  constructor(private http: HttpClient) {
    this.cargarHero();
  }

  private cargarHero() {
    return new Promise<void>((resolve, rejects) => {
      this.http.get<Hero[]>(this.heroUrl).subscribe((resp: Hero[]) => {
        this.hero = resp;
        this.cargando = false;
        resolve();
      });
    });
  }
}
