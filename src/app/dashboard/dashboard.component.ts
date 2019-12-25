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

    brandImage: any;
    constructor(private router: Router, private dashboardService: DashboardService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.brandImage = this.dashboardService
            .getImage('d68bb9c6-6e80-4969-8e1e-52cb88e276e7')
            .subscribe((image: any) => {
                this.brandImage = image;
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
