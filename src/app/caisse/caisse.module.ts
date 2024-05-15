import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaisseRoutingModule } from './caisse-routing.module';
import { CreateComponent } from './componets/create/create.component';
import { ListComponent } from './componets/list/list.component';
import { HistoriqueComponent } from './componets/historique/historique.component';
import { CoreModule } from '../core/core.module';
import { DecaissementComponent } from './components/decaissement/decaissement.component';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    HistoriqueComponent,
    DecaissementComponent
  ],
  imports: [
    CommonModule,
    CaisseRoutingModule,
    CoreModule
  ]
})
export class CaisseModule { }
