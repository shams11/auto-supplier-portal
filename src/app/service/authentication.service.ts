import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { User } from '../common/models/user';
import { Constants } from '../common/constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private httpClient: HttpClient,
                private configService: ConfigService) {
    }

    authenticate(username, password): Observable<any> {
        const params = this.getHttpParams(username, password);
        return this.httpClient.post<User>(this.configService.getLoginUrl(),
            params,
            this.getHttpOptions(username, password))
            .pipe(
                map(
                    userData => {
                        sessionStorage.setItem('username', username);
                        return userData;
                    }
                )
            );
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(Constants.USERNAME);
        return !(user === null);
    }

    logOut() {
        sessionStorage.removeItem(Constants.USERNAME);
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
