import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeContribuableListeComponent } from './components/type-contribuable-liste/type-contribuable-liste.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { TypeContribuableCreateComponent } from './components/type-contribuable-create/type-contribuable-create.component';

const routes: Routes = [
  {path:'liste', component:TypeContribuableListeComponent,canActivate:[AuthGuard]},
  {path:'add', component:TypeContribuableCreateComponent,canActivate:[AuthGuard]},
  {path:'update/:id', component:TypeContribuableCreateComponent,canActivate:[AuthGuard]},
  {path:'', pathMatch:'full', redirectTo:'liste'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeContribuableRoutingModule { }
