import { Injectable } from '@angular/core';
import { Social } from "../interfaces/social.interface";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  cargando = true;
  social: Social[] = [];

  constructor(private http: HttpClient) {
    this.cargarSocial();
  }

  private cargarSocial() {
    return new Promise((resolve, rejects) => {
      this.http.get('https://ediervillaneda-a5ab2.firebaseio.com/social.json')
        .subscribe((resp: Social[]) => {
          this.social = resp;
          this.cargando = false;
          resolve();
        });
    });
  }
}
