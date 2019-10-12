import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserFailed = false;
  addUserForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {
    if (!this.addUserFailed) {
      this.router.navigate(['/add-user']);
    }
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      empId: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      designation: ['']
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

  }

  get f() {
    return this.addUserForm.controls;
  }
}
