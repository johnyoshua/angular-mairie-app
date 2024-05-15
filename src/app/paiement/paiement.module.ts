import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaiementRoutingModule } from './paiement-routing.module';
import { PaiementListeComponent } from './components/paiement-liste/paiement-liste.component';
import { PaiementCreateComponent } from './components/paiement-create/paiement-create.component';
import { CoreModule } from '../core/core.module';
import { PaiementService } from './services/paiement.service';


@NgModule({
  declarations: [
    PaiementListeComponent,
    PaiementCreateComponent
  ],
  imports: [
    CommonModule,
    PaiementRoutingModule,
    CoreModule
  ],
})
export class PaiementModule { }
