import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContribuableRoutingModule } from './contribuable-routing.module';
import { ContribuableListeComponent } from './components/contribuable-liste/contribuable-liste.component';
import { ContribuableCreateComponent } from './components/contribuable-create/contribuable-create.component';
import { CoreModule } from '../core/core.module';
import { ContribuableService } from './services/contribuable.service';
import { HistoriqueComponent } from './components/historique/historique.component';


@NgModule({
  declarations: [
    ContribuableListeComponent,
    ContribuableCreateComponent,
    HistoriqueComponent
  ],
  imports: [
    CommonModule,
    ContribuableRoutingModule,
    CoreModule,
  ],
})
export class ContribuableModule { }
