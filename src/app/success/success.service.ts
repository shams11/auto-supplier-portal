import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(protected router: Router) { }

  goToSuccessPage(message: any) {
    this.router.navigate(['success'], {
      queryParams: {
        successMessage: message
      },
      skipLocationChange: true
    });
  }
}
