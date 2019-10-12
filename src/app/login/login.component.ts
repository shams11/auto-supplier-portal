import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    invalidLogin = false;
    loginForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(private router: Router,
                private loginservice: AuthenticationService,
                private formBuilder: FormBuilder,
                private alertService: AlertService) {
        // redirect to home if already logged in
        if (!this.invalidLogin) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    checkLogin() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        (this.loginservice.authenticate(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['']);
                    this.invalidLogin = false;
                },
                (error) => {
                    this.invalidLogin = true;
                    this.loading = false;
                    this.alertService.error(error);
                }
            ));
    }

    get f() {
        return this.loginForm.controls;
    }
}
