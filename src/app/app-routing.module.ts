import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { ToyotaComponent } from './toyota/toyota.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGaurdService] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
    { path: 'toyota', component: ToyotaComponent, canActivate: [AuthGaurdService] },
    { path: 'add-user', component: AddUserComponent, canActivate: [AuthGaurdService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
