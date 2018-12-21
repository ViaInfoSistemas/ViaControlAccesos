// El interceptor JWT intercepta las solicitudes http de la aplicación para agregar un token de
// autenticación JWT al encabezado de autorización si el usuario ha iniciado sesión.
// Los interceptores de HTTP se agregan a la canalización de solicitud en la sección de proveedores
// del archivo app.module.ts .

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginService } from '../_services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private LoginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token == 'fake-jwt-token') {
            var token = this.LoginService.autenticateUser(currentUser.username, currentUser.password);
            if(token.indexOf('ERR') != -1)
                this.router.navigate(['/login']);
            currentUser.token = token;
        } 
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}