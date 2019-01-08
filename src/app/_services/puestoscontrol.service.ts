import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

const endpoint = environment.apiUrl + '/recursos/';

@Injectable({
  providedIn: 'root'
})
export class PuestoscontrolService {

  constructor(private http: HttpClient) { }

  getPuestosControl() {
    return this.http.get(endpoint + `GET`);
  }
}