import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MontantRoutingModule } from './montant-routing.module';
import { MontantListeComponent } from './components/montant-liste/montant-liste.component';
import { MontantCreateComponent } from './components/montant-create/montant-create.component';
import { CoreModule } from '../core/core.module';
import { MontantService } from './services/montant.service';


@NgModule({
  declarations: [
    MontantListeComponent,
    MontantCreateComponent
  ],
  imports: [
    CommonModule,
    MontantRoutingModule,
    CoreModule,
  ],
  providers:[
    MontantService,
  ]
})
export class MontantModule { }
