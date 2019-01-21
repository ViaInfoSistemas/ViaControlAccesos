// El interceptor JWT intercepta las solicitudes http de la aplicación para agregar un token de
// autenticación JWT al encabezado de autorización si el usuario ha iniciado sesión.
// Los interceptores de HTTP se agregan a la canalización de solicitud en la sección de proveedores
// del archivo app.module.ts .

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from './../../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginService } from '../_services/login.service';
import { CommonService } from '../_services/common.service'
import { User } from '../_model/user';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    user: User;

    constructor(private _authenticationService: AuthenticationService, private router: Router,
        private LoginService: LoginService, private commonService: CommonService) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._authenticationService.getCurrentToken();
        let clone: HttpRequest<any>;
        if (token) {
            if (environment.refreshTokenClient) {
                if (!this.commonService.tokenValido(this.getExpDateToken())) {
                    // renew token
                    token = this._authenticationService.refreshToken();

                    if (token == null) {
                        alert('Se ha perdido la autenticación. Debe volver a iniciar sesión');
                        this._authenticationService.logout();
                        location.reload(true);
                    }
                }
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

        //console.info('req.headers =', request.headers, ';');
        return next.handle(clone)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.type == 4 && event.status == 200)
                    this._authenticationService.updateTokenByRequest(event.body);
                return event;
                // if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
                //     console.info('HttpResponse::event =', event, ';');
                // } else console.info('event =', event, ';');
                // return event;
            })
            // .catch((err: any, caught) => {
            //     if (err instanceof HttpErrorResponse) {
            //         if (err.status === 403) {
            //             console.info('err.error =', err.error, ';');
            //         }
            //         return Observable.throw(err);
            //     }
            // });

        return next.handle(clone);
    }

    getExpDateToken() {
        this.user = this._authenticationService.currentUserValue;

        // Onbtiene tiempo de duarción del token
        var diffMs = (this.user.tokenDateExpirationServer.valueOf() - this.user.tokenDateGenerationServer.valueOf()); // milliseconds
        var TokenDurationServer = Math.round(diffMs / 1000); // seconds

        // Calcula diferencia entre genración del server y cliente
        var diffMs = (this.user.tokenDateGenerationClient.valueOf() - this.user.tokenDateGenerationServer.valueOf()); // milliseconds
        var TokenDifGeneration = Math.round(diffMs / 1000); // seconds

        // A la fecha de generación del token del cliente, le agrega el tiempo de duración y resta diferencia entre server - cliente - 5 min
        // Agrega tiempo de duración
        let tokenDateGenerationClient = new Date(this.user.tokenDateGenerationClient);
        let expDate = tokenDateGenerationClient.setSeconds(TokenDurationServer);
        // Resta diferencia + 5 minutos
        expDate = tokenDateGenerationClient.setSeconds(-(TokenDifGeneration + 300));

        return expDate;
    }

}