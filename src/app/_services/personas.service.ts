import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:15000/api/personas/';

@Injectable({
    providedIn: 'root'
})
export class PersonasService {

    constructor(private http: HttpClient) { }

    getPersonas(id: number, nombre: string, GrupoFamiliar: number, Socios: boolean, Empleados: boolean, IngEsp: boolean, TarAux: boolean) {
        try {
            return this.http.get(endpoint
                + `FindByCriteria?id=${id}&Nombre=${nombre}&GrupoFamiliar=${GrupoFamiliar}&Socios=${Socios}&Empleados=${Empleados}&IngEsp=${IngEsp}&TarAux=${TarAux}`);
        } catch (e) {
            console.log(e);
        }
    }

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}