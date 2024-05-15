import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { ContribuableListeComponent } from './components/contribuable-liste/contribuable-liste.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ContribuableCreateComponent } from './components/contribuable-create/contribuable-create.component';
import { HistoriqueComponent } from './components/historique/historique.component';

const routes: Routes = [
  {path:'liste', component:ContribuableListeComponent,canActivate:[AuthGuard]},
  {path:'add', component:ContribuableCreateComponent, canActivate:[AuthGuard]},
  {path:'update/:id',component:ContribuableCreateComponent, canActivate:[AuthGuard]},
  {path:'historique/:id', component:HistoriqueComponent, canActivate:[AuthGuard]},
  {path:'',pathMatch:'full',redirectTo:'liste'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContribuableRoutingModule { }
