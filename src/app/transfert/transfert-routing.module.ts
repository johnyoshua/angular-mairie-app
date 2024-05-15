import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ValiderComponent } from './components/valider/valider.component';
import { ListValideComponent } from './components/list-valide/list-valide.component';

const routes: Routes = [
  {path:'list', component:ListComponent, canActivate:[AuthGuard]},
  {path:'valider/:id', component:ValiderComponent, canActivate:[AuthGuard]},
  {path:'liste-valider', component:ListValideComponent, canActivate:[AuthGuard]},
  {path:'', pathMatch:'full', redirectTo:'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfertRoutingModule { }
