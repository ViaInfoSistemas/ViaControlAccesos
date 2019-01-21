import { Component, OnInit } from '@angular/core';
import { RecursosModel } from '../_model/recursos'
import { APIDataModel } from '../_model/interface'
import { User } from '../_model/user'
import { RecursosService } from '../_services/recursos.service'
import { AuthenticationService } from '../_services/authentication.service'

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  recursosData: Array<RecursosModel>;
  recursoSelected: string;
  user: User;
  APIData: APIDataModel;
  error: string;

  constructor(private recursosService: RecursosService, private authenticationService: AuthenticationService) { 
    this.user = authenticationService.currentUserValue;
    this.recursoSelected = (this.user.recurso == undefined || this.user.recurso == '' ? 'sin definir' : this.user.recurso)
  }

  ngOnInit() {
    // Obtiene los recursos disponibles
    this.recursosService.getRecursosPorPuesto(this.user.PuestoControlID).subscribe(
      p => this.onLoadRecursos(p)
      , err => console.log(err)
    );
  }

  onLoadRecursos(data) {
    this.APIData = JSON.parse(data);

    if (this.APIData.Status == "Error") {
      this.error = this.APIData.ErrMessage;
      return;
    }

    this.recursosData = JSON.parse(this.APIData.Data);
  }

  recursoSelect(data: RecursosModel){
    this.user.recursoID = data.RecursoID;
    this.user.recurso = data.Descripcion;
    this.recursoSelected = data.Descripcion;
  }

}