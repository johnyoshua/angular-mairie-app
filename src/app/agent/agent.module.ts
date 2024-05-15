import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { CreateComponent } from './componts/create/create.component';
import { ListComponent } from './componts/list/list.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    CoreModule
  ]
})
export class AgentModule { }
