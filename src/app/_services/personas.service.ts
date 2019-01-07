import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const endpoint = environment.apiUrl + '/personas/';

@Injectable({
    providedIn: 'root'
})
export class PersonasService {

    constructor(private http: HttpClient) { }

    getPersonas(id: number, nombre: string, GrupoFamiliar: number, Socios: boolean, Empleados: boolean, IngEsp: boolean, TarAux: boolean) {
        return this.http.get(endpoint
            + `FindByCriteria?id=${id}&Nombre=${nombre}&GrupoFamiliar=${GrupoFamiliar}&Socios=${Socios}&Empleados=${Empleados}&IngEsp=${IngEsp}&TarAux=${TarAux}`);
    }
}