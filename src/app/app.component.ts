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

  ngOnInit(){
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";      
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
    });
  }

  updateTestMode() {
    // Obtiene la variable local 'TestMode'
    this.testMode = this.commonService.SSTestMode_Get();
  }

}