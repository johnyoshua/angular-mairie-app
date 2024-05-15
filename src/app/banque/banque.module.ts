import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanqueRoutingModule } from './banque-routing.module';
import { BanqueListeComponent } from './components/banque-liste/banque-liste.component';
import { BanqueCreateComponent } from './components/banque-create/banque-create.component';
import { CoreModule } from '../core/core.module';
import { BanqueService } from './services/banque.service';
import { HistoriqueComponent } from './components/historique/historique.component';
import { RetraitComponent } from './components/retrait/retrait.component';


@NgModule({
  declarations: [
    BanqueListeComponent,
    BanqueCreateComponent,
    HistoriqueComponent,
    RetraitComponent
  ],
  imports: [
    CommonModule,
    BanqueRoutingModule,
    CoreModule,
  ],
  
})
export class BanqueModule { }
