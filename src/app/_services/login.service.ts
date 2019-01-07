import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

const endpoint = environment.apiUrl + '/login/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  // Get data
  getEcho() {
    try {
      var req = new XMLHttpRequest();
      req.open('GET', endpoint + 'EchoPing/', false);
      req.send();
      if (req.status == 200 && req.responseText != "true")
        alert(req.responseText);
    } catch (e) {
      this.router.navigate(['error', { msg: 'No se pudo establecer coneción con la API', code: e.code, name: e.name }]);
    }
  }
  autenticateUser(username: string, password: string, RecursoID: number) {
    var token = '';
    try {
      var req = new XMLHttpRequest();
      req.open('POST', endpoint + `Authenticate?username`, false);

      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify({ Username: username, Password: password, RecursoID: RecursoID }));

      if (req.status == 200 && req.responseText != "true") {
        token = req.responseText;
        // Quita comillas dobles
        token = token.replace("\"", "").replace("\"", "");
      } else {
        var msjJSon = JSON.parse(req.responseText);
        token = "ERR:" + msjJSon.Message
      }
    } catch (e) {
      token = 'ERR:' + e.message;
    }
    return token;

    // try {
    //   return this.http.get(endpoint 
    //     + `Authenticate?username=${username}&password=${password}`);
    // } catch (e) {
    //   console.error(e);      
    // }
  }
}