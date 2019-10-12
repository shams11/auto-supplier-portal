import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

    constructor(private alertService: AlertService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem(Constants.USERNAME) && sessionStorage.getItem(Constants.BASIC_AUTH_STRING)) {
            req = req.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem(Constants.BASIC_AUTH_STRING)
                }
            });
        }
        return next.handle(req);
    }


}
