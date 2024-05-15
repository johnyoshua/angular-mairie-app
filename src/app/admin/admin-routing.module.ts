import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { AuthGuard } from '../core/guards/auth.guard';

import { AdminUserComponent } from './components/user/admin-user/admin-user.component';
import { AdminUserListComponent } from './components/user/admin-user-list/admin-user-list.component';
import { AdminUserUpdateComponent } from './components/user/admin-user-update/admin-user-update.component';
import { AdminProfilComponent } from './components/profil/admin-profil/admin-profil.component';
import { AdminListComponent } from './components/profil/admin-list/admin-list.component';

import { DroitsComponent } from './components/profil/droits/droits.component';
import { PasswordUpdateComponent } from './components/paasword/password-update/password-update.component';

const routes: Routes = [
  {path: 'dashboad', component:DashbordComponent,canActivate:[AuthGuard]},
  {path:'user',component:AdminUserComponent, canActivate:[AuthGuard]},
  {path:'user/list', component:AdminUserListComponent, canActivate:[AuthGuard]},
  {path:'user/update/:id', component:AdminUserUpdateComponent, canActivate:[AuthGuard]},
  {path:'profil', component:AdminProfilComponent,canActivate:[AuthGuard]},
  {path:'profil/list', component:AdminListComponent, canActivate:[AuthGuard]},
  {path:'profil/update/:id', component:AdminProfilComponent,canActivate:[AuthGuard]},

  {path:'droits/:id', component:DroitsComponent,canActivate:[AuthGuard]},
  {path: 'password',component:PasswordUpdateComponent,canActivate:[AuthGuard]},
  {path: '', pathMatch:'full', redirectTo: 'dashboad'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
