import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Facts } from '../interfaces/facts.interfase';

@Injectable({
  providedIn: 'root',
})
export class FactsService {
  cargando = true;
  facts: Facts[] = [];

  constructor(private http: HttpClient) {
    this.cargarFacts();
  }

  private cargarFacts() {
    return new Promise<void>((resolve, rejects) => {
      this.http
        .get<Facts[]>('https://ediervillaneda-a5ab2.firebaseio.com/about/facts.json')
        .subscribe((resp: Facts[]) => {
          console.log(resp);

          this.facts = resp;
          this.cargando = false;
          resolve();
        });
    });
  }
}
