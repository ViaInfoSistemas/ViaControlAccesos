import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  AppName: string = 'ViaControlAccesos';
  AppVersion: string = '1.0';
  VersionDate: string = '10/02/2019';

  constructor() { }

  ngOnInit() {
  }

}
