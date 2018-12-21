import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocioModel } from '../_model/socios';

const endpoint = 'http://localhost:15000/api/';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  constructor(private http: HttpClient) { }

  getSocio(id): Observable<SocioModel> {
    return this.http.get<SocioModel>(endpoint + 'socios/get?id=' + id);    
  }
}