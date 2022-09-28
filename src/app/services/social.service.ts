import { Injectable } from '@angular/core';
import { Social } from '../interfaces/social.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  cargando = true;
  public social: Social[] = [];
  private socialUrl = 'https://ediervillaneda-a5ab2.firebaseio.com/hero/social.json';

  constructor(private http: HttpClient) {
    this.cargarSocial();
  }

  private cargarSocial() {
    return new Promise<void>((resolve, rejects) => {
      this.http.get<Social[]>(this.socialUrl).subscribe((resp: Social[]) => {
        this.social = {...resp};
        this.cargando = false;
        resolve();
      });
    });
  }
}
