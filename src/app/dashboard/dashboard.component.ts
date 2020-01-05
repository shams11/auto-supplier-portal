import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../common/models/user';
import { UserService } from '../service/user.service';
import { DashboardService } from '../service/dashboard.service';
import {Constants} from '../common/constants';
import { Brand } from '../common/models/brand';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    imageToShow: any;
    brands: Brand;
    constructor(private router: Router, private dashboardService: DashboardService,
                private userService: UserService) {
    }

    ngOnInit() {
         // this.getImageFromService();
         this.getAllBrands();
    }

    createImageFromBlob(image: Blob) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.imageToShow = reader.result;
        }, false);
        if (image) {
            reader.readAsDataURL(image);
        }
    }

    getImageFromService() {
        this.dashboardService.getImage('8dc069d9-6df9-4d51-80ec-845ed0b4e93c')
            .subscribe(data => {
                this.createImageFromBlob(data);
            }, error => {
                console.log(error);
            });
    }

    // toyotaLogoClicked() {
    //     this.router.navigate(['/toyota']);
    // }

    marutiLogoClicked() {
    }

    getUsers() {
        this.userService.getUsers().subscribe((users: User[]) => {
            // console.log('users => ' + JSON.stringify(users, undefined, 2));
        });
    }


    private getAllBrands() {
        this.dashboardService.getAllBrandsByOrg(sessionStorage.getItem(Constants.ORG_ID))
            .pipe()
            .subscribe(data => {
                this.brands = data;
                //    console.log(' ========>> ' + JSON.stringify(data, null, 4));
                this.createImageFromBlob(data.logo);
            }, error => {
                console.log(error);
            });
    }
}
