import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  msg:string;
  name:string;
  code:string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const msg = this.route.snapshot.paramMap.get('msg');
    const code = this.route.snapshot.paramMap.get('code');
    const name = this.route.snapshot.paramMap.get('name');
    
    this.msg = msg;
    this.code = code;
    this.name = name;
  }
}
