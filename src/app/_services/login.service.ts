import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const endpoint = 'http://localhost:15000/api/login/';

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
      req.open('GET', 'http://localhost:15000/api/login/EchoPing/', false);
      req.send();
      if (req.status == 200 && req.responseText != "true")
        alert(req.responseText);
    } catch (e) {
      this.router.navigate(['error', { msg: 'No se pudo establecer coneción con la API', code: e.code, name: e.name }]);
    }
  }
  autenticateUser(username: string, password: string) {
    var token = '';
    try {
      var req = new XMLHttpRequest();
      req.open('POST', endpoint + `Authenticate?username`, false);

      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify({ Username: username, Password: password }));

      if (req.status == 200 && req.responseText != "true") {
        token = req.responseText;
        // Quita comillas dobles
        token = token.replace("\"", "").replace("\"", "");
      } else {
        token = "ERR:" + req.status
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