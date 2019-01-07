// authentication.service.ts
// El servicio de autenticación JWT se utiliza para iniciar sesión y cerrar sesión en la aplicación,
// para iniciar sesión, publica las credenciales de los usuarios en la API y comprueba la respuesta
// de un token JWT. Si existe, significa que la autenticación fue exitosa, por lo que los detalles 
// del usuario se agregan a la ubicación local. almacenamiento con el token. 
// El interceptor JWT anterior utiliza el token para establecer el encabezado de autorización 
// de las solicitudes http realizadas para asegurar los puntos finales de API.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { User } from '../_model/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: User;
    //public currentUser: Observable<User>;

    constructor(private http: HttpClient, private loginService: LoginService) {
        //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        //this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject;
    }

    login(username: string, password: string, recurso: string, recursoID: number) {
        return this.http.post<any>(`/users/authenticate`, { username, password, recurso, recursoID })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject = user;
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        //sessionStorage.removeItem('currentUser');
        this.currentUserSubject = null;
    }

    getAuthToken() {
        let currentUser = this.currentUserValue;
        if (currentUser && currentUser.token) {
            var token = this.loginService.autenticateUser(currentUser.username, currentUser.password, currentUser.recursoID);
            if (token.indexOf('ERR') != -1)
                return null;
            return token;
        }
    }

    getCurrentToken() {
        let currentUser = this.currentUserValue;
        if (currentUser && currentUser.token)
            return currentUser.token;
        return null;
    }

    refreshToken(): Observable<string> {
        return Observable.of(this.getAuthToken()).delay(200);
    }
}