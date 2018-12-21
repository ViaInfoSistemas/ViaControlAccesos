import { Component, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SociosDialog } from './socios-dialog-component';
import { Router } from '@angular/router';
import { SocioModel } from '../_model/socios';
import { PersonasService } from '../_services/personas.service'

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})

export class SociosComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, public PersonasService: PersonasService) { }

  D_SOCIO: string = "";
  N_SOCIO: number;
  N_GRUPO_FAMI: number;
  Tipo_Busqueda: string;
  SociosData: SocioModel[];
  private personasData: Array<SocioModel>;

  displayedColumns: string[] = ['Numero', 'Nombre', 'TipoIngresoDesc', 'GrupoFamiliar', 'FechaNacimiento', 'NumeroDocumento', 'Estado'];
  dataSource = new MatTableDataSource<SocioModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() { }

  buscar() {
    var TipoBusqueda = this.Tipo_Busqueda;
    this.PersonasService.getPersonas(this.N_SOCIO, this.D_SOCIO, this.N_GRUPO_FAMI, true, false, false, false).subscribe(
      p => this.onLoadPersonasResult(p)
      //, err => console.log(err)
    );
  }
  onLoadPersonasResult(p) {
    this.personasData = JSON.parse(p);
    this.dataSource = new MatTableDataSource<SocioModel>(this.personasData);
    this.dataSource.paginator = this.paginator;
  }  

  selectRow(row) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      N_SOCIO: row.Numero,
      D_SOCIO: row.Nombre
    };

    this.dialog.open(SociosDialog, dialogConfig);

    const dialogRef = this.dialog.open(SociosDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.actionButon(data, row.Numero, row.Nombre)
      // data => alert("Dialog output:" + data)
    );
  }

  actionButon(tipoIngreso, N_SOCIO, D_SOCIO) {
    this.dialog.closeAll();
    if (tipoIngreso != "" && tipoIngreso != undefined) {
      this.router.navigate(['acceso', {
        Msj: "Socio Habilitado", C_ACCE: 0, Recurso: "RECURSO SELECCIONADO"
        , N_SOCIO: N_SOCIO, D_SOCIO: D_SOCIO
      }]);
    }
  }

}