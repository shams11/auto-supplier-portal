import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { ToyotaComponent } from './auto-brands/toyota/dashboard/toyota.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGaurdService] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
    { path: 'toyota', component: ToyotaComponent, canActivate: [AuthGaurdService] },
    { path: 'add-user', component: AddUserComponent, canActivate: [AuthGaurdService] },
    { path: 'add-brand', component: AddBrandComponent, canActivate: [AuthGaurdService] },
    { path: 'error', component: ErrorComponent, canActivate: [AuthGaurdService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
