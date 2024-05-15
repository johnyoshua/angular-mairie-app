import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetPaiementContribuableRoutingModule } from './get-paiement-contribuable-routing.module';
import { GetListComponent } from './components/get-list/get-list.component';
import { GetOneComponent } from './components/get-one/get-one.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    GetListComponent,
    GetOneComponent
  ],
  imports: [
    CommonModule,
    GetPaiementContribuableRoutingModule,
    CoreModule
  ]
})
export class GetPaiementContribuableModule { }
