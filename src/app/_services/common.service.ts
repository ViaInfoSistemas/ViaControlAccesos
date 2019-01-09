import { Injectable } from '@angular/core';

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
    if(TestMode != null && TestMode == 'true')
      test = true;

    return test;
  }

  SSTestMode_Set(value: string) {
    sessionStorage.setItem("TestMode", value);
  }

}
