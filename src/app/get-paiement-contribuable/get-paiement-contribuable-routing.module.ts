import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetListComponent } from './components/get-list/get-list.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { GetOneComponent } from './components/get-one/get-one.component';

const routes: Routes = [
  {path:'liste', component:GetListComponent, canActivate:[AuthGuard]},
  {path:'liste/:id', component:GetOneComponent, canActivate:[AuthGuard]},
  {path:'',pathMatch:'full', redirectTo:'liste'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetPaiementContribuableRoutingModule { }
