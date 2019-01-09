import { Component } from '@angular/core';
import { CommonService } from './_services/common.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ViaControlAccesos';
  testMode: boolean = false;

  constructor(private commonService: CommonService) {
  }

  updateTestMode() {
    // Obtiene la variable local 'TestMode'
    this.testMode = this.commonService.SSTestMode_Get();
  }

}