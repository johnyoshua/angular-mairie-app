import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './componts/list/list.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CreateComponent } from './componts/create/create.component';

const routes: Routes = [
  {path:'list', component:ListComponent, canActivate:[AuthGuard]},
  {path:'create', component:CreateComponent, canActivate:[AuthGuard]},
  {path:'update/:id',  component:CreateComponent, canActivate:[AuthGuard]},
  {path:'', pathMatch:'full', redirectTo:'list'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
