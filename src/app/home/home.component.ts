import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recurso: string = 'RECURSO SELECCIONADO';
  date = new Date();
  hour = new Date();

  constructor(private router: Router, public rest:LoginService) { }

  ngOnInit() {
    //this.logros = this.getLogros();

    // Chequea conexion al WS
    this.rest.getEcho();

    setInterval(() => {         //replaced function() by ()=>
      this.hour = new Date();
      //console.log(this.hour); // just testing if it is working
    }, 1000);
  }

  onKey(event: any) { // without type info
    var keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      if (event.target.value == undefined || event.target.value == "") {
        // Abre búsqueda de socios
        this.router.navigate(['socios']);
      } else {
        if (String(event.target.value).length <= 6)
          this.router.navigate(['acceso', { Msj: "Socio Habilitado", C_ACCE: 0, Recurso: "RECURSO SELECCIONADO"
          , N_SOCIO: event.target.value }]);
        else
          this.router.navigate(['acceso', { Msj: "Socio Inhabilitado", C_ACCE: 1, Recurso: "RECURSO SELECCIONADO"
            , N_SOCIO: event.target.value }]);
      }
    }
  }

  BuscarSocio(){
    this.router.navigate(['socios']);
  }

}