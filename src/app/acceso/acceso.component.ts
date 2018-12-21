import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SociosService } from '../_services/socios.service'

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {
  socio = 'Marco Del Point, Mariana';
  n_socio;
  recurso = '';
  date = new Date();
  hour = new Date();
  descripcion = '';    
  params;
  backColor = '#82E0AA';
  icon = ''; iconColor = '';

  constructor(private route: ActivatedRoute,
     private router: Router,
     private SociosServices: SociosService) { }

  ngOnInit() {
    const C_ACCE = this.route.snapshot.paramMap.get('C_ACCE');
    const Msj = this.route.snapshot.paramMap.get('Msj');
    const Recurso = this.route.snapshot.paramMap.get('Recurso');
    const N_SOCIO = this.route.snapshot.paramMap.get('N_SOCIO');
    const D_SOCIO = this.route.snapshot.paramMap.get('D_SOCIO');

    this.n_socio = N_SOCIO;
    this.socio = D_SOCIO;
    this.recurso = Recurso.toString();
    this.descripcion = Msj.toString();  
    this.icon = 'done'; 
    this.iconColor = 'green';
    
    if (C_ACCE == "1") {
      this.backColor = '#CD6155';
      this.icon = 'cancel';
      this.iconColor = 'red';
    }

    // Espera 5 segundos
    (async () => {
      await delay(5000);
      this.router.navigate(['home']);
    })();
  }
}

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}