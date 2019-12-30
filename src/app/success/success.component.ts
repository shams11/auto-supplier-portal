import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  successMessage: string;

  constructor(private route: ActivatedRoute, protected router: Router) {
  }

  ngOnInit() {
    this.route.queryParamMap
        .pipe()
        .subscribe(params => {
          this.successMessage = params.get('successMessage');
        });
  }

  home() {
    this.router.navigate(['']);
  }
}
