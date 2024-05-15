import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { EnTeteComponent } from './components/en-tete/en-tete.component';
import { MenuMainComponent } from './components/menu-main/menu-main.component';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { FooterService } from './services/footer.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    EnTeteComponent,
    MenuMainComponent,
    MenuTopComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,


  ],
  exports:[
    HeaderComponent,
    SharedModule,
    FooterComponent,
    EnTeteComponent,
    MenuMainComponent,
    MenuTopComponent,
  ],
  providers:[
    FooterService
  ]
})
export class CoreModule { }
