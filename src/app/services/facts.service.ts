import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Facts } from '../interfaces/facts.interfase';
import { GlobalCostants } from '../global.constants';

@Injectable({
  providedIn: 'root',
})
export class FactsService {
  cargando = true;
  facts: Facts = {};
  private url = `${GlobalCostants.firebaseUrl}/about/facts.json`;

  constructor(private http: HttpClient) {
    this.cargarFacts();
  }

  private cargarFacts() {
    return new Promise<void>((resolve, rejects) => {
      this.http.get<Facts>(this.url).subscribe((resp: Facts) => {
        this.facts = resp;
        this.cargando = false;
        resolve();
      });
    });
  }
}
