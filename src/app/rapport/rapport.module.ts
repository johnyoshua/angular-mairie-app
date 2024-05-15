import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RapportRoutingModule } from './rapport-routing.module';
import { CoreModule } from '../core/core.module';
import { RapportService } from './services/rapport.service';
import { PaiementTaxesComponent } from './components/paiement-taxes/paiement-taxes.component';


@NgModule({
  declarations: [
    PaiementTaxesComponent
  ],
  imports: [
    CommonModule,
    RapportRoutingModule,
    CoreModule,
  ],
  providers: [
    RapportService,
  ]

})
export class RapportModule { }
