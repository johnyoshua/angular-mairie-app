import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiementListeComponent } from './components/paiement-liste/paiement-liste.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { PaiementCreateComponent } from './components/paiement-create/paiement-create.component';

const routes: Routes = [
  {path:'liste', component:PaiementListeComponent, canActivate:[AuthGuard]},
  {path:'add',component:PaiementCreateComponent, canActivate:[AuthGuard]},
  {path:'update/:id',component:PaiementCreateComponent, canActivate:[AuthGuard]},
  {path:'',pathMatch:'full', redirectTo:'liste'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaiementRoutingModule { }
