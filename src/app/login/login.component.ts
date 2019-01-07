import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { RecursosService } from '../_services/recursos.service';
import { RecursosModel } from '../_model/recursos'
import { LoginService } from '../_services/login.service';
import { APIDataModel } from '../_model/interface'

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string; recursos: string; username: string; password: string;
  error = '';
  hide = true;
  private recursosData: Array<RecursosModel>;
  private recursoSelected: RecursosModel;
  private APIData: APIDataModel;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private recursosService: RecursosService,
    public rest: LoginService
  ) { }

  ngOnInit() {
    this.rest.getEcho();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // Obtiene los recursos disponibles
    this.recursosService.getRecursos().subscribe(
      p => this.onLoadRecursos(p)
      , err => console.log(err)
    );

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoadRecursos(data) {
    this.APIData = JSON.parse(data);

    if (this.APIData.Status == "Error") {
      this.error = this.APIData.ErrMessage;
      return;
    }

    this.recursosData = JSON.parse(this.APIData.Data);
  }
  RecursoSelected(data) {
    this.recursoSelected = data;
  }

  onSubmit() {
    if (this.username == undefined || this.username == '') {
      this.error = 'Debe ingresar el nombre de usuario';
      return;
    }
    if (this.password == undefined || this.password == '') {
      this.error = 'Debe ingresar la contraseña';
      return;
    }
    if (this.recursoSelected == undefined) {
      this.error = 'Debe seleccionar un recurso';
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.username, this.password, this.recursoSelected.Descripcion, this.recursoSelected.RecursoID)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}