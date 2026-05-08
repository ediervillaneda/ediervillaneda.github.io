import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Portfolio } from '../interfaces/portfolio.interface';
import { GlobalCostants } from '../global.constants';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  cargando = true;
  portfolio: Portfolio = {};
  private url = `${GlobalCostants.firebaseUrl}/portfolio.json`;

  constructor(private http: HttpClient) {
    this.cargarPortfolio();
  }

  private cargarPortfolio() {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Portfolio>(this.url).subscribe({
        next: (resp: Portfolio) => {
          this.portfolio = resp;
          this.cargando = false;
          resolve();
        },
        error: (err: unknown) => {
          this.cargando = false;
          reject(err);
        },
      });
    });
  }
}
