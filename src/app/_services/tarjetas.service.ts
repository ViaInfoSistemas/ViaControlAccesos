import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { APIDataModel } from '../_model/interface'
import { DOCUMENT } from '@angular/platform-browser';

const endpoint = environment.apiUrl + '/tarjetas/';

@Injectable({
  providedIn: 'root'
})

export class TarjetasService {

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: any) { 
    this.domain = this.document.location.hostname;
  }

  dataJson: APIDataModel;
  domain:any;

  // ngOnInit() {
  //   this.domain = this.document.location.hostname;
  //   this.hostname = this.domain;
  // }
  
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

  sendRegistrar(tarjeta: number, test: boolean, sinCarnet: boolean){
    return this.http.get<object>(endpoint + `RegistrarIngreso?tarjeta=${tarjeta}&test=${test}
      &sinCarnet=${sinCarnet}&computerName=${this.domain}`);
  }
}