import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { UserService } from '../service/user.service';
import { ErrorService } from '../service/error.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  implements OnInit {

  addUserFailed = false;
  addUserForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private userService: UserService,
              private errorService: ErrorService) {
    if (!this.addUserFailed) {
      this.router.navigate(['/add-user']);
    }
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  createUser() {
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }
    this.loading = true;
    // addUserFailed to true while catching the error
    // loading to false while catching the error
    this.userService.createUser(this.addUserForm.getRawValue())
        .pipe()
        .subscribe(
        (response) => {
        },
            (error) => {
              if (error) {
                this.errorService.goToErrorPage({
                  error: {
                    externalErrorCode: 'add-user-error'
                  },
                });
              }
            });
  }

  get f() {
    return this.addUserForm.controls;
  }
}
