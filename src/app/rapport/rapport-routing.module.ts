import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { PaiementTaxesComponent } from './components/paiement-taxes/paiement-taxes.component';

const routes: Routes = [
  {path:'paiement-taxes', component:PaiementTaxesComponent, canActivate:[AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportRoutingModule { }
