import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';
import { PagesRoutingModule } from './pages.routes';
import { AngularMaterialModule } from '../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { StaticModule } from '../static/static.module';



@NgModule({
  declarations: [
    CourseComponent,
    ContactComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    StaticModule
  ]
})
export class PagesModule { }
