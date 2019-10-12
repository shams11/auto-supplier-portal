import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../common/models/user';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
    }

    toyotaLogoClicked() {
        this.router.navigate(['/toyota']);
    }

    marutiLogoClicked() {
    }

    getUsers() {
        this.userService.getUsers().subscribe((users: User[]) => {
            // console.log('users => ' + JSON.stringify(users, undefined, 2));
        });
    }
}
