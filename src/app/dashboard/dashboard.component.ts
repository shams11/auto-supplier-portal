import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../common/models/user';
import { UserService } from '../service/user.service';
import { DashboardService } from '../service/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    imageToShow: any;
    constructor(private router: Router, private dashboardService: DashboardService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.getImageFromService();
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
        this.dashboardService.getImage('e12c6679-425c-48fa-bc25-3e555ea5abf3')
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


}
