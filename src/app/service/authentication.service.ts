import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { User } from '../common/models/user';
import { Constants } from '../common/constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient,
                private configService: ConfigService) {
    }

    authenticate(username, password): Observable<any> {
        const params = this.getHttpParams(username, password);
        return this.http.post<User>(this.configService.getLoginUrl(),
            params,
            this.getHttpOptions(username, password))
            .pipe(
                map(
                    userData => {
                        sessionStorage.setItem(Constants.USERNAME, username);
                        sessionStorage.setItem(Constants.ROLE, userData[ Constants.ROLES ][ 0 ].uniqueName);
                        const basicAuthString = Constants.BASIC_AUTH_TYPE + btoa(username + ':' + password);
                        sessionStorage.setItem(Constants.BASIC_AUTH_STRING, basicAuthString);
                        return userData;
                    }
                )
            );
    }

    isUserLoggedIn() {
        const user = sessionStorage.getItem(Constants.USERNAME);
        return !(user === null);
    }

    getRole() {
        return sessionStorage.getItem(Constants.ROLE);
    }

    isAdmin() {
        const bool = this.getRole();
        return Constants.ADMIN === bool;
    }

    logOut() {
        sessionStorage.removeItem(Constants.USERNAME);
        sessionStorage.removeItem(Constants.ROLE);
        sessionStorage.removeItem(Constants.BASIC_AUTH_STRING);
    }

    getHttpParams(username: string, password: string) {
        return new HttpParams({
            fromObject: {
                username,
                password
            }
        });
    }

    getHttpOptions(username, password) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': Constants.X_WWW_FORM_URLENCODED,
                Authorization: 'Basic ' + btoa(username + ':' + password)
            })
        };
        return httpOptions;
    }
}
