import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosteListeComponent } from './components/poste-liste/poste-liste.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { PosteCreateComponent } from './components/poste-create/poste-create.component';

const routes: Routes = [
  {path:'liste', component:PosteListeComponent, canActivate:[AuthGuard]},
  {path:'add', component:PosteCreateComponent, canActivate:[AuthGuard]},
  {path:'update/:id',component:PosteCreateComponent, canActivate:[AuthGuard]},
  {path: '', pathMatch:'full', redirectTo: 'liste'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosteRoutingModule { }
