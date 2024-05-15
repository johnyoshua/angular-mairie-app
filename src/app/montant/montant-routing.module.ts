import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MontantListeComponent } from './components/montant-liste/montant-liste.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { MontantCreateComponent } from './components/montant-create/montant-create.component';

const routes: Routes = [
  {path:'liste', component:MontantListeComponent, canActivate:[AuthGuard]},
  {path: 'add',component:MontantCreateComponent, canActivate:[AuthGuard]},
  {path: 'update/:id',component:MontantCreateComponent, canActivate:[AuthGuard]},
  {path: '', pathMatch:'full', redirectTo: 'liste'},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MontantRoutingModule { }
