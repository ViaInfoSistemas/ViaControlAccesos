import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  // SessionStorage
  // - TestMode

  SSTestMode_Get() {
    let test: boolean = false;
    let TestMode = sessionStorage.getItem('TestMode');
    if (TestMode != null && TestMode == 'true')
      test = true;

    return test;
  }

  SSTestMode_Set(value: string) {
    sessionStorage.setItem("TestMode", value);
  }

  // Token
  tokenValido(exp: number): boolean {
    var bOk = true;
    exp = exp / 1000;
    
    var current_time = new Date().getTime() / 1000;
    if (current_time > exp)
      bOk = false;

    return bOk;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  TimeStampToDate(unixtimestamp: number) {
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp * 1000);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // Display date time in MM-dd-yyyy h:m:s format
    //var convdataTime = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var convdataTime = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var NewDate = new Date(convdataTime);

    return NewDate;
}

}
