import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  addUserFailed = false;
  addBrandForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {
    if (!this.addUserFailed) {
      this.router.navigate(['/add-brand']);
    }
  }

  ngOnInit() {
    this.addBrandForm = this.formBuilder.group({
      name: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  createBrand() {
    alert('coming');
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.addBrandForm.invalid) {
      return;
    }

    this.loading = true;

    // addUserFailed to true while catching the error
    // loading to false while catching the error

  }

  get f() {
    return this.addBrandForm.controls;
  }
}
