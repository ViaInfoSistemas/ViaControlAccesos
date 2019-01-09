import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../_services/common.service'
import { AppComponent } from '../app.component'
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
    , private sociosService: SociosService, private tarjetasService: TarjetasService, private appComponent: AppComponent
    , private commonService: CommonService) {
    this.user = authenticationService.currentUserValue;
    this.recurso = `[${this.user.recurso}]`;
    appComponent.updateTestMode();
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
      if (event.target.value == "0000000000") {
        this.changeTestMode();
        this.inputSocio.nativeElement.value = '';
        return;
      }

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
          this.tarjetasService.sendRegistrar(this.SocioData.Tarjeta, false).subscribe(
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
        });
    }
    else {
      this.error = this.APIData.ErrMessage;
      this.loading = false;
      this.controlMsg = '';
      this.inputSocio.nativeElement.focus();
    }
  }
  onLoadErrorSocio(error) {
    this.error = error;
    this.loading = false;
  }

  BuscarSocio() {
    this.router.navigate(['socios']);
  }

  changeTestMode() {
    let testMode = this.commonService.SSTestMode_Get();

    if(testMode == true)
      this.commonService.SSTestMode_Set('false');
    else
      this.commonService.SSTestMode_Set('true');

    this.appComponent.updateTestMode();
  }

}