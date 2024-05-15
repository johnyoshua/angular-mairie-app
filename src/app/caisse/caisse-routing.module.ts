import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './componets/list/list.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CreateComponent } from './componets/create/create.component';
import { HistoriqueComponent } from './componets/historique/historique.component';
import { DecaissementComponent } from './components/decaissement/decaissement.component';

const routes: Routes = [
  {path:'list', component:ListComponent, canActivate:[AuthGuard]},
  {path:'create',component:CreateComponent, canActivate:[AuthGuard]},
  {path:'update/:id', component:CreateComponent, canActivate:[AuthGuard]},
  {path:'historique/:id', component:HistoriqueComponent, canActivate:[AuthGuard]},
  {path:'decaissement/:id', component:DecaissementComponent, canActivate:[AuthGuard]},
  {path:'', pathMatch:'full', redirectTo:'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaisseRoutingModule { }
