import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
//import { ErrorsHandler } from './_helpers/error.handler';

// Components
import { HomeComponent } from './home/home.component';
import { SociosComponent } from './socios/socios.component';
import { SociosDialog } from './socios/socios-dialog-component';
import { AccesoComponent } from './acceso/acceso.component';
import { LoginComponent } from './login/login.component';
import { fakeBackendProvider } from './_helpers';
import { SociosService } from './_services/socios.service';
import { PersonasService  } from './_services/personas.service';
import { ErrorComponent } from './error/error.component';

// Material https://material.angular.io/guide/getting-started 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
 
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule,
  MatChipsModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
  MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatTooltipModule, MatTreeModule,
} from '@angular/material';

@NgModule({
  declarations: [ AppComponent, HomeComponent, SociosComponent, AccesoComponent, SociosDialog, LoginComponent, ErrorComponent ],
  entryComponents: [ SociosDialog ],
  imports: [
    NoopAnimationsModule, BrowserAnimationsModule, CdkTableModule, CdkTreeModule, DragDropModule, MatAutocompleteModule,
    MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
    MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule,
    MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
    MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    MatTreeModule, ScrollingModule, BrowserModule, AppRoutingModule, MatToolbarModule, MatCardModule, MatListModule, MatTabsModule,
    MatDatepickerModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    // BrowserAnimationsModule,
    // NoopAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatSelectModule,
  ],
  exports: [
    CdkTableModule,  CdkTreeModule, DragDropModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
    MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule,
    MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    MatTreeModule, ScrollingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //{ provide: ErrorHandler, useClass: ErrorsHandler },

    // provider used to create fake backend
    SociosService, PersonasService,
    fakeBackendProvider
],
  bootstrap: [AppComponent]
}) export class AppModule { }