import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { UserService } from '../service/user.service';
import { ErrorService } from '../service/error.service';
import {SuccessService} from '../service/success.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  implements OnInit,  OnDestroy {

  addUserFailed = false;
  addUserForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private userService: UserService,
              private errorService: ErrorService,
              private successService: SuccessService) {
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
    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }
    this.loading = true;
    // addUserFailed to true while catching the error
    // loading to false while catching the error
    this.userService.createUser(this.addUserForm.value)
        .pipe()
        .subscribe(
            (response) => {
              this.successService.goToSuccessPage('You have successfully added the user');
            },
            (error) => {
              this.loading = false;
              this.alertService.error(error);
            });
  }

  get f() {
    return this.addUserForm.controls;
  }

  ngOnDestroy() {
    this.alertService.clear();
  }
}
