import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Rx'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

const endpoint = environment.apiUrl + '/recursos/';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {  
  data;
  observable;

  constructor(private http: HttpClient) { }

  getRecursos() {
    return this.http.get(endpoint + `get`);
  }

  getRecursosPorPuesto(PuestoControlID: number) {
    //return this.http.get(endpoint + `get?PuestoControlID=${PuestoControlID}`);

    // TODO: Para cachear el resultado:
    // - habilitar las variables data y observable; 
    // - habilitar los imports
    // import { Observable } from 'rxjs/Rx'
    // import 'rxjs/add/observable/of';
    // import 'rxjs/add/operator/share';
    // import 'rxjs/add/operator/map';

    if (this.data) {
      return Observable.of(this.data);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get(endpoint + `get?PuestoControlID=${PuestoControlID}`, {
        observe: 'response'
      })
        .map(response => {
          this.observable = null;
          if (response.status === 400) {
            return 'Request failed.';
          } else if (response.status === 200) {
            this.data = response.body;
            return this.data;
          }
        })
        .share();
      return this.observable;
    }
  }
}