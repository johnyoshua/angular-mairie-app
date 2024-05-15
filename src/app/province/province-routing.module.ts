import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceListeComponent } from './components/province-liste/province-liste.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProvinceCreateComponent } from './components/province-create/province-create.component';

const routes: Routes = [
  {path:'liste', component:ProvinceListeComponent, canActivate:[AuthGuard]},
  {path:'add', component:ProvinceCreateComponent, canActivate:[AuthGuard]},
  {path:'update/:id',component:ProvinceCreateComponent, canActivate:[AuthGuard]},
  {path: '', pathMatch:'full', redirectTo: 'liste'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinceRoutingModule { }
