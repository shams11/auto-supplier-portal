import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { BrandService } from '../brand/brand.service';
import { ModelService } from '../add-model/model.service';
import { VariantService } from '../add-variant/variant.service';
import { SuccessService } from '../success/success.service';
import { ErrorService } from '../error/error.service';
import { Constants } from '../common/constants';
import { PartService } from './part.service';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit, OnDestroy {

  addPartForm: FormGroup;
  loading = false;
  submitted = false;
  models: any;
  brands: any;
  variants: any;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private brandService: BrandService,
              private modelService: ModelService,
              private variantService: VariantService,
              private successService: SuccessService,
              private errorService: ErrorService,
              private partService: PartService) { }

  ngOnInit() {
    this.addPartForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      modelId: ['', Validators.required],
      variantId: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.getAllBrandsForLoggedInUser();
  }

  get f() {
    return this.addPartForm.controls;
  }

  ngOnDestroy() {
    this.alertService.clear();
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

  getAllModelsByBrand(brandId) {
    this.modelService.getAllModelsByBrand(brandId)
        .pipe()
        .subscribe(data => {
          this.models = data;
        }, error => {
          this.errorService.goToErrorPage(error);
        });
  }
  createPart() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addPartForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.addPartForm.value, null, 4));
    this.loading = true;

    this.partService.createVariant(this.addPartForm.value, this.variantId.value)
        .pipe()
        .subscribe(
            (variant) => {
              this.successService.goToSuccessPage('You have successfully created part');
            }, (error) => {
              this.loading = false;
              this.alertService.error(error);
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
    return this.addPartForm.get('brand');
  }

  changeModel(event) {
    this.modelId.setValue(event.target.value, {
      onlySelf: true
    });
    this.getAllVariantsByModel(this.modelId.value);
  }

  // Getter method to access formcontrols
  get modelId() {
    return this.addPartForm.get('modelId');
  }

  changeVariant(event) {
    this.variantId.setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Getter method to access formcontrols
  get variantId() {
    return this.addPartForm.get('variantId');
  }

  private getAllVariantsByModel(modelId) {
    this.variantService.getAllVariantsByModel(modelId)
        .pipe()
        .subscribe(data => {
          this.variants = data;
        }, error => {
          this.errorService.goToErrorPage(error);
        });
  }
}
