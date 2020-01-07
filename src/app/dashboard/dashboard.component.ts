import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../common/constants';
import { Brand } from '../common/models/brand';
import { BrandService } from '../brand/brand.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    brands: Brand;
    constructor(private router: Router,
                private brandService: BrandService) {
    }

    ngOnInit() {
         this.getAllBrandsForLoggedInUser();
    }

    private getAllBrandsForLoggedInUser() {
        this.brandService.getAllBrandsByOrg(sessionStorage.getItem(Constants.ORG_ID))
            .pipe()
            .subscribe(data => {
                this.brands = data;
            }, error => {
                console.log(error);
            });
    }
}
