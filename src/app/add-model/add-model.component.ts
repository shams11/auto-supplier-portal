import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { BrandService } from '../brand/brand.service';
import { SuccessService } from '../success/success.service';
import { Constants } from '../common/constants';
import { Brand } from '../common/models/brand';
import { HttpEventType } from '@angular/common/http';
import { ModelService } from './model.service';

@Component({
  selector: 'app-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit, OnDestroy {

  addModelFailed = false;
  addModelForm: FormGroup;
  loading = false;
  submitted = false;
  selectedFile = null;
  brands: Brand;
  brandId: any;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private brandService: BrandService,
              private modelService: ModelService,
              private successService: SuccessService) {
    if (!this.addModelFailed) {
      this.router.navigate(['/add-models']);
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
        .pipe()
        .subscribe(data => {
          this.brands = data;
        }, error => {
          console.log(error);
        });
  }

  get f() {
    return this.addModelForm.controls;
  }

  ngOnDestroy() {
    this.alertService.clear();
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
    console.log(JSON.stringify(this.addModelForm.value, null, 4));
    this.loading = true;

    const imageData = new FormData();
    imageData.append('logo', this.selectedFile, this.selectedFile.name);
    this.modelService.createModel(this.addModelForm.value, imageData)
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
  }

  changeBrand(event) {
    console.log(event);
    this.brand.setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Getter method to access formcontrols
  get brand() {
    return this.addModelForm.get('brand');
  }
}
