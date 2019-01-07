import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocioModel } from '../_model/socios';
import { environment } from './../../environments/environment';

const endpoint = environment.apiUrl + '/socios/';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  constructor(private http: HttpClient) { }

  getSocio(id): Observable<SocioModel> {
    return this.http.get<SocioModel>(endpoint + `get?id=${id}`);
  }

  getFoto(id) {
    return this.http.get(endpoint + `GetFoto?N_SOCIO=${id}`);
  }
}