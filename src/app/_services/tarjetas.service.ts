import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { APIDataModel } from '../_model/interface'
import { Observable, observable } from 'rxjs';
//import { Stream } from 'stream';

const endpoint = environment.apiUrl + '/tarjetas/';

@Injectable({
  providedIn: 'root'
})

export class TarjetasService {

  constructor(private http: HttpClient) { }

  dataJson: APIDataModel;

  // validarTarjeta(PuestoControlID: number, RecursoID: number, usuario: string, tarjeta: number): Observable<any>{
  //   return this.sendValidar(PuestoControlID, RecursoID, usuario, tarjeta).subscribe(
  //     data => this.onLoadValidar(data)
  //     , err => this.onErrValidar(err)
  //   );
  // }
  // onLoadValidar(data): object {
  //   this.dataJson = JSON.parse(data);
  //   return this.dataJson;
  // }
  // onErrValidar(err) {
  //   return false;
  // }

  sendValidar(PuestoControlID: number, RecursoID: number, usuario: string, tarjeta: number){
    return this.http.get<object>(endpoint + `ValidarIngreso?PuestoControlID=${PuestoControlID}&RecursoID=${RecursoID}
      &usuario=${usuario}&tarjeta=${tarjeta}`);
  }

  sendRegistrar(tarjeta: number, test: boolean, sinCarnet: boolean, computerName: string){
    return this.http.get<object>(endpoint + `RegistrarIngreso?tarjeta=${tarjeta}&test=${test}
      &sinCarnet=${sinCarnet}&computerName=${computerName}`);
  }
}