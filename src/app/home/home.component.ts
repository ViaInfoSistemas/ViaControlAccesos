import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { AuthenticationService } from '../_services/authentication.service'
import { SociosService } from '../_services/socios.service'
import { TarjetasService } from '../_services/tarjetas.service'
import { APIDataModel } from '../_model/interface'
import { SocioModel } from '../_model/socios'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  recurso: string = '';
  date = new Date();
  hour = new Date();
  error: string = '';
  controlMsg: string = '';
  APIData: APIDataModel;
  SocioData: SocioModel;
  loading = false;
  user;
  
  constructor(private router: Router, public rest: LoginService, private authenticationService: AuthenticationService
    , private sociosService: SociosService, private tarjetasService: TarjetasService) {
    this.user = authenticationService.currentUserValue;
    this.recurso = `[${this.user.recurso}]`;
  }

  @ViewChild("inputSocio") inputSocio: ElementRef;

  ngOnInit() {
    // Chequea conexion al WS
    this.rest.getEcho();
    this.error = '';
    this.inputSocio.nativeElement.focus();

    setInterval(() => {
      this.hour = new Date();
    }, 1000);
  }

  onKey(event: any) { // without type info
    this.error = '';
    this.controlMsg = '';
    var keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      if (event.target.value == undefined || event.target.value == "") {
        // Abre búsqueda de socios
        this.router.navigate(['socios']);
      } else {
        this.loading = true;
        this.controlMsg = 'Validando datos';
        this.sociosService.getSocio(event.target.value).subscribe(
          p => this.onLoadSocio(p)
          , err => this.onLoadErrorSocio(err)
        );
        // if (String(event.target.value).length <= 6) {
        //   // Busca el socio por numero
        //   this.sociosService.getSocio(event.target.value).subscribe(
        //     p => this.onLoadSocio(p)
        //     , err => this.onLoadErrorSocio(err)
        //   );
        // }
        // else {
        //   // Busca el socio por tarjeta
        //   this.sociosService.getSocioByTarjeta(event.target.value).subscribe(
        //     p => this.onLoadSocio(p)
        //     , err => this.onLoadErrorSocio(err)
        //   );

        //   this.router.navigate(['acceso', { Msj: "Socio Inhabilitado", C_ACCE: 1, Recurso: "RECURSO SELECCIONADO"
        //     , N_SOCIO: event.target.value }]);
        // }
      }
    }
  }

  onLoadSocio(data) {
    this.APIData = JSON.parse(data);
    if (this.APIData.Status == "OK") {
      this.SocioData = JSON.parse(this.APIData.Data);

      // Valida tarjeta
      this.tarjetasService.sendValidar(0, this.user.recursoID, this.user.username, this.SocioData.Tarjeta).subscribe(
        (data: object) => {
          let JSData = JSON.parse(data.toString());
          var acceso = 0;
          var msg = 'Acceso habilitado';
          
          if(JSData.Status != 'OK') {
            acceso = 1;
            msg = JSData.ErrMessage;
          }

          // Registra ingreso
          this.controlMsg = 'Registrando ingreso';
          this.tarjetasService.sendRegistrar(this.SocioData.Tarjeta, false, false, 'TEST').subscribe(
            (data: object) => {
              let JSData = JSON.parse(data.toString());
              
              if(JSData.Status != 'OK') {
                acceso = 1;
                msg = JSData.ErrMessage;
              }
    
              this.loading = false;
              this.router.navigate(['acceso', {
                Msj: msg, C_ACCE: acceso, Recurso: this.recurso
                , N_SOCIO: this.SocioData.Numero, D_SOCIO: this.SocioData.Nombre
              }]);
            });

          // this.loading = false;
          // this.router.navigate(['acceso', {
          //   Msj: msg, C_ACCE: acceso, Recurso: this.recurso
          //   , N_SOCIO: this.SocioData.Numero, D_SOCIO: this.SocioData.Nombre
          // }]);
        });
    }
    else {
      this.error = this.APIData.ErrMessage;
      this.loading = false;
      this.controlMsg = '';
    }
  }
  onLoadErrorSocio(error) {
    this.error = error;
    this.loading = false;
  }

  BuscarSocio() {
    this.router.navigate(['socios']);
  }

}