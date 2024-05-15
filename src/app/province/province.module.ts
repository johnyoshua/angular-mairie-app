import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceListeComponent } from './components/province-liste/province-liste.component';
import { ProvinceCreateComponent } from './components/province-create/province-create.component';
import { CoreModule } from '../core/core.module';
import { ProvinceService } from './services/province.service';


@NgModule({
  declarations: [
    ProvinceListeComponent,
    ProvinceCreateComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    CoreModule
  ],
  providers:[
    ProvinceService
  ]
})
export class ProvinceModule { }
