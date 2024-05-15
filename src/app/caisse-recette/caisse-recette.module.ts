import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaisseRecetteRoutingModule } from './caisse-recette-routing.module';
import { ListComponent } from './components/list/list.component';
import { TransfertComponent } from './components/transfert/transfert.component';
import { CoreModule } from '../core/core.module';
import { HistoriqueComponent } from './components/historique/historique.component';


@NgModule({
  declarations: [
    ListComponent,
    TransfertComponent,
    HistoriqueComponent
  ],
  imports: [
    CommonModule,
    CaisseRecetteRoutingModule,
    CoreModule
  ]
})
export class CaisseRecetteModule { }
