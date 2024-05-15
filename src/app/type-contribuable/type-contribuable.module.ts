import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeContribuableRoutingModule } from './type-contribuable-routing.module';
import { TypeContribuableListeComponent } from './components/type-contribuable-liste/type-contribuable-liste.component';
import { TypeContribuableCreateComponent } from './components/type-contribuable-create/type-contribuable-create.component';
import { CoreModule } from '../core/core.module';
import { TypeContribuableService } from './services/type-contribuable.service';


@NgModule({
  declarations: [
    TypeContribuableListeComponent,
    TypeContribuableCreateComponent
  ],
  imports: [
    CommonModule,
    TypeContribuableRoutingModule,
    CoreModule,
  ],
  providers:[
    TypeContribuableService,
  ]
})
export class TypeContribuableModule { }
