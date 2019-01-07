import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SociosService } from '../_services/socios.service'
import { APIDataModel } from '../_model/interface';

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
  icon = ''; iconColor = ''; ImgSocio = '';

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
    this.ImgSocio = 'data:image/gif;base64,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';   

    this.SociosServices.getFoto(N_SOCIO).subscribe(data => {
      let JSData = JSON.parse(data.toString());
      if(JSData != null && JSData.Status == 'OK')
        this.ImgSocio = 'data:image/gif;base64,' + JSData.Data;
    });

    if (C_ACCE == "1") {
      this.backColor = '#CD6155';
      this.icon = 'cancel';
      this.iconColor = 'red';
    }

    // Espera 5 segundos
    (async () => {
      await delay(3000);
      this.router.navigate(['home']);
    })();
  }
}

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}