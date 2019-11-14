import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './entry/contact/contact.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ContactComponent
  ],
  entryComponents: [
    FooterComponent,
    HeaderComponent,
    ContactComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class StaticModule { }
