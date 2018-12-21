// La protección de autenticación es una protección de ruta angular que se utiliza para evitar
// que los usuarios no autenticados accedan a rutas restringidas, lo hace implementando la interfaz
// CanActivate , que permite a la guardia decidir si una ruta se puede activar con el método 
// canActivate() . Si el método devuelve true la ruta se activa (se permite continuar), 
// de lo contrario, si el método devuelve false se bloquea la ruta.

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;        
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}