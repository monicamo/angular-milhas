import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UnidadeFederativa } from '../types/type';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnidadeFederativaService {
  private apiUrl: string = environment.apiUrl
  private cache$?: Observable<UnidadeFederativa[]>;

  constructor(private httpClient: HttpClient) { }

  listar () : Observable<UnidadeFederativa[]> {
    if (!this.cache$) {
      this.cache$ =  this.requestEstados().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  requestEstados(): Observable<UnidadeFederativa[]> {
     return this.httpClient.get<UnidadeFederativa[]>(`${this.apiUrl}/estados`)
  }
}
