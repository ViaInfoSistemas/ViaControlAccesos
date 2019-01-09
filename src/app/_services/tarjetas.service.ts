import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { APIDataModel } from '../_model/interface'
import { DOCUMENT } from '@angular/platform-browser';
import { CommonService } from '../_services/common.service'

const endpoint = environment.apiUrl + '/tarjetas/';

@Injectable({
  providedIn: 'root'
})

export class TarjetasService {

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: any, private commonService: CommonService) { 
    this.domain = this.document.location.hostname;
  }

  dataJson: APIDataModel;
  domain:any;

  sendValidar(PuestoControlID: number, RecursoID: number, usuario: string, tarjeta: number){
    return this.http.get<object>(endpoint + `ValidarIngreso?PuestoControlID=${PuestoControlID}&RecursoID=${RecursoID}
      &usuario=${usuario}&tarjeta=${tarjeta}`);
  }

  sendRegistrar(tarjeta: number, sinCarnet: boolean){
    let test: boolean = this.commonService.SSTestMode_Get();

    return this.http.get<object>(endpoint + `RegistrarIngreso?tarjeta=${tarjeta}&test=${test}
      &sinCarnet=${sinCarnet}&computerName=${this.domain}`);
  }
}