import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { UserComponent } from './user/user.component';
import { BrandComponent } from './brand/brand.component';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';
import { AddModelComponent } from './add-model/add-model.component';
import { ModelDashboardComponent } from './modeldashboard/modeldashboard.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGaurdService] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
    { path: 'users', component: UserComponent, canActivate: [AuthGaurdService] },
    { path: 'brands', component: BrandComponent, canActivate: [AuthGaurdService] },
    { path: 'add-models', component: AddModelComponent, canActivate: [AuthGaurdService] },
    { path: 'models', component: ModelDashboardComponent, canActivate: [AuthGaurdService] },
    { path: 'error', component: ErrorComponent, canActivate: [AuthGaurdService] },
    { path: 'success', component: SuccessComponent, canActivate: [AuthGaurdService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
