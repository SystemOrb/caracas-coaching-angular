import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './server/rest.service';
import { GlobalService } from './global/global.service';



@NgModule({
  declarations: [],
  providers: [
    RestService,
    GlobalService
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ]
})
export class ServicesModule { }
