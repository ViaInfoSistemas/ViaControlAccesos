import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'socios-dialog',
    templateUrl: './socios-dialog.component.html',
    styleUrls: ['./socios-dialog.component.css']
})
export class SociosDialog implements OnInit {    
    D_SOCIO:string;

    constructor(        
        private dialogRef: MatDialogRef<SociosDialog>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.D_SOCIO = data.D_SOCIO;
    }

    ngOnInit() {}

    Ingreso(data) {
        this.dialogRef.close(data);
    }

    Close() {
        this.dialogRef.close();
    }
}