import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from '@angular/router';
import { SociosService } from '../_services/socios.service'
import { TarjetasService } from '../_services/tarjetas.service'
import { SocioModel } from '../_model/socios';
import { APIDataModel } from '../_model/interface'

@Component({
  selector: 'socios-dialog',
  templateUrl: './socios-dialog.component.html',
  styleUrls: ['./socios-dialog.component.css']
})
export class SociosDialog implements OnInit {
  D_SOCIO: string; msg: string; recurso: string;
  N_SOCIO: number;
  user;
  APIData: APIDataModel;
  SocioData: SocioModel;
  loading = false;

  constructor(private dialogRef: MatDialogRef<SociosDialog>, @Inject(MAT_DIALOG_DATA) data, private sociosService: SociosService
    , private tarjetasService: TarjetasService, private router: Router) {
    this.D_SOCIO = data.D_SOCIO;
    this.N_SOCIO = data.N_SOCIO;
    this.recurso = data.recurso;
    this.user = data.user;
  }

  ngOnInit() { }

  Ingreso(data) {
    if (this.user.recursoID == undefined || this.user.recursoID == null) {
      this.msg = 'Falta informar Recurso';
      return;
    }

    this.sociosService.getSocio(this.N_SOCIO).subscribe(
      p => this.onLoadSocio(p, data)
      , err => this.onLoadErrorSocio(err)
    );
  }

  onLoadSocio(data, tipoIngreso) {
    this.msg = 'Verificando datos';
    this.APIData = JSON.parse(data);
    this.loading = true;

    if (this.APIData.Status == "OK") {
      this.SocioData = JSON.parse(this.APIData.Data);

      if (this.SocioData == null || this.SocioData.Tarjeta == null) {
        this.msg = 'El socio no cuenta con tarjeta habilitada';
        this.loading = false;
        return;
      }

      // Valida tarjeta
      this.tarjetasService.sendValidar(0, this.user.recursoID, this.user.username, this.SocioData.Tarjeta).subscribe(
        (data: object) => {
          let JSData = JSON.parse(data.toString());
          var acceso = 0;
          var msgAcceso = 'Acceso habilitado';

          if (JSData.Status != 'OK') {
            acceso = 1;
            msgAcceso = JSData.ErrMessage;
          }

          // Registra ingreso
          this.msg = 'Registrando ingreso';

          let SinTarjeta: boolean = false;
          if (tipoIngreso == 'S')
            SinTarjeta = true;

          this.tarjetasService.sendRegistrar(this.SocioData.Tarjeta, SinTarjeta).subscribe(
            (data: object) => {
              let JSData = JSON.parse(data.toString());

              if (JSData.Status != 'OK') {
                acceso = 1;
                msgAcceso = JSData.ErrMessage;
              }

              this.dialogRef.close(data);

              this.router.navigate(['acceso', {
                Msj: msgAcceso, C_ACCE: acceso, Recurso: this.recurso
                , N_SOCIO: this.SocioData.Numero, D_SOCIO: this.SocioData.Nombre
              }]);
            },
            err => { this.onLoadErrorSocio(err); });
        },
        err => { this.onLoadErrorSocio(err); });
    }
    else {
      this.msg = this.APIData.ErrMessage;
      this.loading = false;
    }
  }
  onLoadErrorSocio(error) {
    this.msg = error;
    this.loading = false;
  }

  Close() {
    this.dialogRef.close();
  }
}