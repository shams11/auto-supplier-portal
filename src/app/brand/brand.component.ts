import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../service/alert.service';
import {BrandService} from './brand.service';
import {HttpEventType} from '@angular/common/http';
import {SuccessService} from '../service/success.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit, OnDestroy {

  addUserFailed = false;
  addBrandForm: FormGroup;
  loading = false;
  submitted = false;
  selectedFile = null;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private brandService: BrandService,
              private successService: SuccessService) {
    if (!this.addUserFailed) {
      this.router.navigate(['/brands']);
    }
  }

  ngOnInit() {
    this.addBrandForm = this.formBuilder.group({
      name: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  createBrand() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addBrandForm.invalid) {
      return;
    }
    this.loading = true;

    const imageData = new FormData();
    imageData.append('logo', this.selectedFile, this.selectedFile.name);
    this.brandService.createBrand(this.addBrandForm.value, imageData)
        .pipe()
        .subscribe(
            (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                // console.log('Uplaod Progress : ' + Math.round(event.loaded / event.total * 100) + '%');
              } else if (event.type === HttpEventType.Response) {
                console.log(event);
                this.successService.goToSuccessPage('You have successfully uploaded brand logo');
              }
            }, (error) => {
              this.loading = false;
              this.alertService.error(error);
            });

    // addUserFailed to true while catching the error
    // loading to false while catching the error

  }

  get f() {
    return this.addBrandForm.controls;
  }

  ngOnDestroy() {
    this.alertService.clear();
  }

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
  }
}
