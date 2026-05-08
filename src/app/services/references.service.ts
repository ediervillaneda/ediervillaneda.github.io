import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { References } from '../interfaces/references.interface';
import { GlobalCostants } from '../global.constants';

@Injectable({
  providedIn: 'root',
})
export class ReferencesService {
  cargando = true;
  references: References = {};
  private url = `${GlobalCostants.firebaseUrl}/references.json`;

  constructor(private http: HttpClient) {
    this.cargarReferences();
  }

  private cargarReferences() {
    return new Promise<void>((resolve, reject) => {
      this.http.get<References>(this.url).subscribe({
        next: (resp: References) => {
          this.references = resp;
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
