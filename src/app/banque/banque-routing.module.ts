import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { BanqueListeComponent } from './components/banque-liste/banque-liste.component';
import { BanqueCreateComponent } from './components/banque-create/banque-create.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { RetraitComponent } from './components/retrait/retrait.component';


const routes: Routes = [
  {path:'liste', component:BanqueListeComponent, canActivate:[AuthGuard]},
  {path:'add',component:BanqueCreateComponent, canActivate:[AuthGuard]},
  {path:'update/:id',component:BanqueCreateComponent, canActivate:[AuthGuard]},
  {path: 'historique/:id', component:HistoriqueComponent, canActivate:[AuthGuard]},
  {path:'retrait/:id', component:RetraitComponent, canActivate:[AuthGuard]},
  {path:'', pathMatch:'full', redirectTo:'liste'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanqueRoutingModule { }
