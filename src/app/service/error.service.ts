import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(protected router: Router) { }

  goToErrorPage(error: any) {
    const errorCode = error.error ? error.error.externalErrorCode : '';
    this.router.navigate([ 'error' ], {
      queryParams: {
        errorCode: errorCode
      },
      skipLocationChange: true
    });
  }
}
