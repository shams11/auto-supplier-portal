import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorCode: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap
        .pipe()
        .subscribe(params => {
          this.errorCode = params.get('errorCode');
          let error = 'system-error';
          if (this.errorCode) {
            error = this.errorCode.indexOf('error') === -1 ? `${this.errorCode}-error` : this.errorCode;
          }
        });
  }

}
