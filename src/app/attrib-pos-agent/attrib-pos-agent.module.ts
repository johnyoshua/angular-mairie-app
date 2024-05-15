import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttribPosAgentRoutingModule } from './attrib-pos-agent-routing.module';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    AttribPosAgentRoutingModule,
    CoreModule
  ]
})
export class AttribPosAgentModule { }
