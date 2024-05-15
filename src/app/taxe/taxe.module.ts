import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxeRoutingModule } from './taxe-routing.module';
import { TaxeListeComponent } from './components/taxe-liste/taxe-liste.component';
import { TaxeCreateComponent } from './components/taxe-create/taxe-create.component';
import { CoreModule } from '../core/core.module';
import { TaxeService } from './services/taxe.service';


@NgModule({
  declarations: [
    TaxeListeComponent,
    TaxeCreateComponent
  ],
  imports: [
    CommonModule,
    TaxeRoutingModule,
    CoreModule,
  ],
  providers:[
    TaxeService
  ]
})
export class TaxeModule { }
