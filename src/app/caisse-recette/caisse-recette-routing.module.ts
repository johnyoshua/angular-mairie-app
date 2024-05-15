import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { TransfertComponent } from './components/transfert/transfert.component';
import { HistoriqueComponent } from './components/historique/historique.component';

const routes: Routes = [
  {path:'list', component:ListComponent, canActivate:[AuthGuard]},
  {path:'transfert/:id', component:TransfertComponent, canActivate:[AuthGuard]},
  {path:'historique/:id', component:HistoriqueComponent , canActivate:[AuthGuard]},
  {path:'', pathMatch:'full', redirectTo:'list'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaisseRecetteRoutingModule { }
