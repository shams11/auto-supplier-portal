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
import { AddVariantComponent } from './add-variant/add-variant.component';
import { VariantDashboardComponent } from './variantdashboard/variantdashboard.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGaurdService] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
    { path: 'users', component: UserComponent, canActivate: [AuthGaurdService] },
    { path: 'brands', component: BrandComponent, canActivate: [AuthGaurdService] },
    { path: 'add-model', component: AddModelComponent, canActivate: [AuthGaurdService] },
    { path: 'add-variant', component: AddVariantComponent, canActivate: [AuthGaurdService] },
    { path: 'models', component: ModelDashboardComponent, canActivate: [AuthGaurdService] },
    { path: 'variants', component: VariantDashboardComponent, canActivate: [AuthGaurdService] },
    { path: 'error', component: ErrorComponent, canActivate: [AuthGaurdService] },
    { path: 'success', component: SuccessComponent, canActivate: [AuthGaurdService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
