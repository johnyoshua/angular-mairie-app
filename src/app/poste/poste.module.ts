import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosteRoutingModule } from './poste-routing.module';
import { PosteListeComponent } from './components/poste-liste/poste-liste.component';
import { PosteCreateComponent } from './components/poste-create/poste-create.component';
import { CoreModule } from '../core/core.module';
import { PosteService } from './services/poste.service';


@NgModule({
  declarations: [
    PosteListeComponent,
    PosteCreateComponent
  ],
  imports: [
    CommonModule,
    PosteRoutingModule,
    CoreModule
  ],
 
})
export class PosteModule { }
