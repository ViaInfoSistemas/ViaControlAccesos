import { Component, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core'
import { AuthenticationService } from '../_services/authentication.service'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SociosDialog } from './socios-dialog-component';
import { SocioModel } from '../_model/socios';
import { PersonasService } from '../_services/personas.service'
import { APIDataModel } from '../_model/interface'

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})

export class SociosComponent implements OnInit {
  constructor(public dialog: MatDialog, private PersonasService: PersonasService, private authenticationService: AuthenticationService) {
    this.user = authenticationService.currentUserValue;
    this.recurso = `[${this.user.recurso}]`;
  }

  @ViewChild("inputNombre") inputNombre: ElementRef;

  user;
  recurso: string = '';
  D_SOCIO: string = "";
  N_SOCIO: number;
  N_GRUPO_FAMI: number;
  Tipo_Busqueda: string;
  APIData: APIDataModel;
  SociosData: SocioModel[];
  private personasData: Array<SocioModel>;
  loading = false;
  msgBusqueda = '';
  tipoBusquedaSelected: string = 'Todo';
  tiposBusqueda = [
    'Todo',
    'Solo Empleados',
    'Solo Socios',
    'Otros',
  ];

  displayedColumns: string[] = ['Numero', 'Nombre', 'TipoIngresoDesc', 'GrupoFamiliar', 'FechaNacimiento', 'NumeroDocumento', 'Estado'];
  dataSource = new MatTableDataSource<SocioModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() { 
    this.inputNombre.nativeElement.focus();
  }

  onKey(event: any) { // without type info
    var keyCode = event.which || event.keyCode;
    if (keyCode === 13)
      this.buscar();
  }

  buscar() {
    this.msgBusqueda = '';
    var socios = false, empleados = false, ingEsp = false, tarj = false;
    if (this.tipoBusquedaSelected == "Todo") {
      socios = true;
      empleados = true;
      ingEsp = true;
      tarj = true;
    } else if (this.tipoBusquedaSelected == "Solo Empleados") {
      empleados = true;
    } else if (this.tipoBusquedaSelected == "Solo Socios") {
      socios = true;
    } else if (this.tipoBusquedaSelected == "Otros") {
      ingEsp = true;
      tarj = true;
    }

    if (this.N_SOCIO == undefined && (this.D_SOCIO == undefined || this.D_SOCIO == '') && this.N_GRUPO_FAMI == undefined) {
      this.msgBusqueda = 'Debe informar al menos un parámetro de búsqueda';
      return;
    }

    this.loading = true;
    this.PersonasService.getPersonas(this.N_SOCIO, this.D_SOCIO, this.N_GRUPO_FAMI, socios, empleados, ingEsp, tarj).subscribe(
      p => this.onLoadPersonasResult(p)
      , err => this.onLoadError(err)
    );
  }
  onLoadPersonasResult(p) {
    this.loading = false;
    this.APIData = JSON.parse(p);

    if (this.APIData.Status == "Error") {
      this.msgBusqueda = this.APIData.ErrMessage;
      return;
    }

    this.personasData = JSON.parse(this.APIData.Data);
    this.dataSource = new MatTableDataSource<SocioModel>(this.personasData);
    this.dataSource.paginator = this.paginator;
  }
  onLoadError(e) {
    this.loading = false;
    this.msgBusqueda = e;
  }

  selectRow(row) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      N_SOCIO: row.Numero,
      D_SOCIO: row.Nombre,
      recurso: this.recurso,
      user: this.user
    };

    this.dialog.open(SociosDialog, dialogConfig);

    const dialogRef = this.dialog.open(SociosDialog, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      data => this.dialog.closeAll()
    );
  }
}