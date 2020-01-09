import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../service/alert.service';
import { SuccessService } from '../success/success.service';
import { VariantService } from './variant.service';
import { ErrorService } from '../error/error.service';
import { Constants } from '../common/constants';
import { BrandService } from '../brand/brand.service';
import { ModelService } from '../add-model/model.service';

@Component({
  selector: 'app-add-variant',
  templateUrl: './add-variant.component.html',
  styleUrls: ['./add-variant.component.css']
})
export class AddVariantComponent implements OnInit, OnDestroy {

  addVariantFailed = false;
  addVariantForm: FormGroup;
  loading = false;
  submitted = false;
  models: any;
  brands: any;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private brandService: BrandService,
              private modelService: ModelService,
              private variantService: VariantService,
              private successService: SuccessService,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.addVariantForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      modelId: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.getAllBrandsForLoggedInUser();
  }

  // TODO: Need to commonaize this code. Also present in add-model.component.ts
  private getAllBrandsForLoggedInUser() {
    this.brandService.getAllBrandsByOrg(sessionStorage.getItem(Constants.ORG_ID))
        .pipe()
        .subscribe(data => {
          this.brands = data;
        }, error => {
          this.errorService.goToErrorPage(error);
        });
  }

  createVariant() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addVariantForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.addVariantForm.value, null, 4));
    this.loading = true;

    this.variantService.createVariant(this.addVariantForm.value, this.modelId.value)
        .pipe()
        .subscribe(
            (variant) => {
              this.successService.goToSuccessPage('You have successfully created variant');
            }, (error) => {
              this.loading = false;
              this.alertService.error(error);
            });
  }

  get f() {
    return this.addVariantForm.controls;
  }

  ngOnDestroy() {
    this.alertService.clear();
  }

  getAllModelsByBrand(brandId) {
    this.modelService.getAllModelsByBrand(brandId)
        .pipe()
        .subscribe(data => {
          this.models = data;
        }, error => {
          this.errorService.goToErrorPage(error);
        });
  }

  changeBrand(event) {
    this.brand.setValue(event.target.value, {
      onlySelf: true
    });
    this.getAllModelsByBrand(this.brand.value);
  }

  // Getter method to access formcontrols
  get brand() {
    return this.addVariantForm.get('brand');
  }

  changeModel(event) {
    this.modelId.setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Getter method to access formcontrols
  get modelId() {
    return this.addVariantForm.get('modelId');
  }
}
