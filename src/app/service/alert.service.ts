import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    message: string;

    constructor() {
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string) {
        this.subject.next(this.message);
    }

    error(error) {
        this.handleError(error);
        this.subject.next(this.message);
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }

    handleError(error: HttpErrorResponse) {
        switch (error.status) {
            case 401:
                this.message = 'Username or password is incorrect';
                break;
            case 500:
                this.message = error.error.message;
                break;
            default:
                this.message = error.error.message;
                return throwError(error);
        }
    }
}
