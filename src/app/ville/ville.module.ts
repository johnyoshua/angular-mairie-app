import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VilleRoutingModule } from './ville-routing.module';
import { VilleListeComponent } from './components/ville-liste/ville-liste.component';
import { VilleCreateComponent } from './components/ville-create/ville-create.component';
import { CoreModule } from '../core/core.module';
import { VilleService } from './service/ville.service';


@NgModule({
  declarations: [
    VilleListeComponent,
    VilleCreateComponent
  ],
  imports: [
    CommonModule,
    VilleRoutingModule,
    CoreModule,
  ],
  providers:[
    VilleService,
  ]
})
export class VilleModule { }
