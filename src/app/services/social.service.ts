import { Injectable } from '@angular/core';
import { Social } from '../interfaces/social.interface';
import { HttpClient } from '@angular/common/http';
import { GlobalCostants } from '../global.constants';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  cargando = true;
  public social: Social[] = [];
  private url = `${GlobalCostants.firebaseUrl}/hero.json`;

  constructor(private http: HttpClient) {
    this.cargarSocial();
  }

  private cargarSocial() {
    return new Promise<void>((resolve, rejects) => {
      this.http.get<Social[]>(this.url).subscribe((resp: Social[]) => {
        this.social = resp;
        this.cargando = false;
        resolve();
      });
    });
  }
}
