import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfertRoutingModule } from './transfert-routing.module';
import { ListComponent } from './components/list/list.component';
import { ValiderComponent } from './components/valider/valider.component';
import { ListValideComponent } from './components/list-valide/list-valide.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    ListComponent,
    ValiderComponent,
    ListValideComponent,
  ],
  imports: [
    CommonModule,
    TransfertRoutingModule,
    CoreModule
  ]
})
export class TransfertModule { }
