import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AlertService } from '../service/alert.service';
import { BrandService } from './brand.service';
import { SuccessService } from '../success/success.service';
import { BaseComponent } from '../common/base/base.component';


@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.css']
})
export class BrandComponent extends BaseComponent implements OnInit {

    addBrandFailed = false;
    addBrandForm: FormGroup;
    loading = false;
    submitted = false;
    selectedFile = null;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private alertService: AlertService,
                private brandService: BrandService,
                private successService: SuccessService) {
        super();
        if (!this.addBrandFailed) {
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
            .pipe(takeUntil(this.componentDestroyed$ as any))
            .subscribe(
                (event) => {
                    this.successService.goToSuccessPage('You have successfully uploaded brand logo');
                }, (error) => {
                    this.loading = false;
                    this.alertService.error(error);
                });
    }

    get f() {
        return this.addBrandForm.controls;
    }

    onFileSelected(event) {
        this.selectedFile = (event.target.files[0] as File);
    }
}
