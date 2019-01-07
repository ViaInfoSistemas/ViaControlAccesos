// El interceptor JWT intercepta las solicitudes http de la aplicación para agregar un token de
// autenticación JWT al encabezado de autorización si el usuario ha iniciado sesión.
// Los interceptores de HTTP se agregan a la canalización de solicitud en la sección de proveedores
// del archivo app.module.ts .

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, RouteReuseStrategy } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AuthenticationService } from '../_services/authentication.service';
import { LoginService } from '../_services/login.service';
import * as jwt_decode from "jwt-decode";
import 'rxjs/add/operator/do';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private _authenticationService: AuthenticationService,
        private router: Router,
        private LoginService: LoginService) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._authenticationService.getCurrentToken();
        let clone: HttpRequest<any>;
        if (token) {
            var TokenDec = this.getDecodedAccessToken(token);
            if (!this.tokenValido(TokenDec.exp)) {
                // renew token
                this._authenticationService.refreshToken().subscribe(result => {
                    token = result
                })
            }
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`
                }
            });
        }
        return next.handle(clone);

        // ORIGINAL
        // let currentUser = this.authenticationService.currentUserValue;
        // if (currentUser && currentUser.token) {
        //     var TokenDec = this.getDecodedAccessToken(currentUser.token);
        //     if (!this.tokenValido(TokenDec.exp)) {
        //         var token = this.LoginService.autenticateUser(currentUser.username, currentUser.password, currentUser.recursoID);
        //         if (token.indexOf('ERR') != -1)
        //             this.router.navigate(['/login']);
        //         currentUser.token = token;
        //     }

        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser.token}`
        //         }
        //     });
        // }

        // OK
        //return next.handle(request);

        // return next.handle(this.addToken(request, this.authenticationService.getAuthToken()))
        // .catch(error => {
        //     if (error instanceof HttpErrorResponse) {
        //         switch ((<HttpErrorResponse>error).status) {
        //             case 400:
        //                 return this.handle400Error(error);
        //             case 401:
        //                 return this.handle401Error(request, next);
        //         }
        //     } else {
        //         return Observable.throw(error);
        //     }
        // });

        //});
    }


    tokenValido(exp: number): boolean {
        var bOk = true;

        var current_time = new Date().getTime() / 1000;
        if (current_time > exp)
            bOk = false;

        return bOk;
    }
    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }
}