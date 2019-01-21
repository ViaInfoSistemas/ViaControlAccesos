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
import { LoginService } from '../_services/login.service';
import { CommonService } from '../_services/common.service'
import { User } from '../_model/user';
import { APIDataModel } from '../_model/interface'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: User;
    private APIData: APIDataModel;

    constructor(private http: HttpClient, private loginService: LoginService, private commonService: CommonService) { }

    public get currentUserValue(): User {
        return this.currentUserSubject;
    }

    login(username: string, password: string, recurso: string, PuestoControlID: number) {
        return this.http.post<any>(`/users/authenticate`, { username, password, recurso, PuestoControlID })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //sessionStorage.setItem('currentUser', JSON.stringify(user));
                    user.tokenDateGenerationClient = new Date();
                    var TokenDec = this.commonService.getDecodedAccessToken(user.token);
                    user.tokenDateGenerationServer = new Date(TokenDec.iat * 1000);
                    user.tokenDateExpirationServer = new Date(TokenDec.exp * 1000);
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
            var token = this.loginService.autenticateUser(currentUser.username, currentUser.password, currentUser.PuestoControlID);
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
    
    refreshToken() {
        let token = this.getAuthToken();
        
        if(token != null) {
            var TokenDec = this.commonService.getDecodedAccessToken(token);
            this.currentUserSubject.token = token;
            this.currentUserSubject.tokenDateGenerationClient = new Date(); 
            this.currentUserSubject.tokenDateGenerationServer = new Date(TokenDec.iat * 1000);
            this.currentUserSubject.tokenDateExpirationServer = new Date(TokenDec.exp * 1000);
        }

        return token;
    }

    updateTokenByRequest(request: string) {
        try 
        {
            this.APIData = JSON.parse(request);

            if (this.APIData.newToken != '') {
                var TokenDec = this.commonService.getDecodedAccessToken(this.APIData.newToken);
                this.currentUserSubject.token = this.APIData.newToken;
                this.currentUserSubject.tokenDateGenerationClient = new Date(); 
                this.currentUserSubject.tokenDateGenerationServer = new Date(TokenDec.iat * 1000);
                this.currentUserSubject.tokenDateExpirationServer = new Date(TokenDec.exp * 1000);
            }
        }
        catch {}
    }    
}