import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { CoreModule } from '../core/core.module';
import { MasterService } from './services/master.service';
import { AdminUserComponent } from './components/user/admin-user/admin-user.component';
import { AdminUserListComponent } from './components/user/admin-user-list/admin-user-list.component';
import { AdminUserUpdateComponent } from './components/user/admin-user-update/admin-user-update.component';
import { AdminProfilComponent } from './components/profil/admin-profil/admin-profil.component';
import { AdminListComponent } from './components/profil/admin-list/admin-list.component';
import { DroitsComponent } from './components/profil/droits/droits.component';
import { DashboardService } from './services/dashboard.service';
import { PasswordUpdateComponent } from './components/paasword/password-update/password-update.component';

@NgModule({
  declarations: [
    DashbordComponent,
    AdminUserComponent,
    AdminUserListComponent,
    AdminUserUpdateComponent,
    AdminProfilComponent,
    AdminListComponent,
    DroitsComponent,
    PasswordUpdateComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
  ],
  
})
export class AdminModule { }
