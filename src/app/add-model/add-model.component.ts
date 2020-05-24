import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

import { AlertService } from '../service/alert.service';
import { BrandService } from '../brand/brand.service';
import { SuccessService } from '../success/success.service';
import { Constants } from '../common/constants';
import { Brand } from '../common/models/brand';
import { ModelService } from './model.service';
import { ErrorService } from '../error/error.service';
import { BaseComponent } from '../common/base/base.component';

@Component({
  selector: 'app-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent extends BaseComponent implements OnInit {

  addModelFailed = false;
  addModelForm: FormGroup;
  loading = false;
  submitted = false;
  selectedFile = null;
  brands: Brand;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private brandService: BrandService,
              private modelService: ModelService,
              private successService: SuccessService,
              private errorService: ErrorService) {
    super();
    if (!this.addModelFailed) {
      this.router.navigate(['/add-model']);
    }
  }

  ngOnInit() {
    this.addModelForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      file: ['', Validators.required]
    });

    this.getAllBrands();
  }

  private getAllBrands() {
    this.brandService.getAllBrandsByOrg(sessionStorage.getItem(Constants.ORG_ID))
        .pipe(takeUntil(this.componentDestroyed$ as any))
        .subscribe(data => {
          this.brands = data;
        }, error => {
          this.errorService.goToErrorPage(error);
        });
  }

  get f() {
    return this.addModelForm.controls;
  }

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
  }

  createModel() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addModelForm.invalid) {
      return;
    }
    this.loading = true;

    const imageData = new FormData();
    imageData.append('logo', this.selectedFile, this.selectedFile.name);
    this.modelService.createModel(this.addModelForm.value, imageData)
        .pipe(takeUntil(this.componentDestroyed$ as any))
        .subscribe(
            (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                // console.log('Uplaod Progress : ' + Math.round(event.loaded / event.total * 100) + '%');
              } else if (event.type === HttpEventType.Response) {
                this.successService.goToSuccessPage('You have successfully uploaded brand logo');
              }
            }, (error) => {
              this.loading = false;
              this.alertService.error(error);
            });
  }

  changeBrand(event) {
    this.brand.setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Getter method to access formcontrols
  get brand() {
    return this.addModelForm.get('brand');
  }
}
