import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToyotaComponent } from './auto-brands/toyota/dashboard/toyota.component';
import { UserComponent } from './user/user.component';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-http-interceptor.service';
import { BrandComponent } from './brand/brand.component';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';
import { AddModelComponent } from './add-model/add-model.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        LogoutComponent,
        AlertComponent,
        DashboardComponent,
        ToyotaComponent,
        UserComponent,
        BrandComponent,
        ErrorComponent,
        SuccessComponent,
        AddModelComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
