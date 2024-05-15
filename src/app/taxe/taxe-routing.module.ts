import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxeListeComponent } from './components/taxe-liste/taxe-liste.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { TaxeCreateComponent } from './components/taxe-create/taxe-create.component';

const routes: Routes = [
  {path:'liste',component:TaxeListeComponent, canActivate:[AuthGuard]},
  {path:'add',component:TaxeCreateComponent,canActivate:[AuthGuard]},
  {path:'update/:id',component:TaxeCreateComponent,canActivate:[AuthGuard]},
  {path: '', pathMatch:'full', redirectTo: 'liste'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxeRoutingModule { }
