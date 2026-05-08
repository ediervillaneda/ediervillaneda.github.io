import { Injectable } from '@angular/core';
import { Social } from '../interfaces/social.interface';
import { HttpClient } from '@angular/common/http';
import { GlobalCostants } from '../global.constants';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  cargando = true;
  social: Social = {
    icon: '',
    url: ''
  };
  private url = `${GlobalCostants.firebaseUrl}/hero.json`;

  constructor(private http: HttpClient) {
    this.cargarSocial();
  }

  private cargarSocial() {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Social>(this.url).subscribe({
        next: (resp: Social) => {
          this.social = resp;
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
