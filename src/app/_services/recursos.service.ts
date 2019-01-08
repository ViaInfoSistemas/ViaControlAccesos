import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

const endpoint = environment.apiUrl + '/recursos/';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor(private http: HttpClient) { }

  getRecursos() {
    return this.http.get(endpoint + `GET`);
  }

  getRecursosPorPuesto(PuestoControlID: number) {
    return this.http.get(endpoint + `GET&PuestoControlID=${PuestoControlID}`);
  }
}