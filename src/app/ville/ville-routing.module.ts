import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VilleListeComponent } from './components/ville-liste/ville-liste.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { VilleCreateComponent } from './components/ville-create/ville-create.component';

const routes: Routes = [
  {path:'liste', component:VilleListeComponent, canActivate:[AuthGuard]},
  {path:'add',component:VilleCreateComponent, canActivate:[AuthGuard]},
  {path:'update/:id',component:VilleCreateComponent, canActivate:[AuthGuard]},
  {path: '', pathMatch:'full', redirectTo: 'liste'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VilleRoutingModule { }
