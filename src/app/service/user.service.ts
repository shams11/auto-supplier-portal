import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../common/models/user';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import {ContentTypeConstants} from '../common/content-type-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  getUsers() {
    return this.http.get<User[]>(this.configService.getUsersUrl());
  }

  createUser(body): Observable<User> {
    // TODO : How to send admin role?
    const headers = new HttpHeaders({'Content-Type': ContentTypeConstants.APPLICATION_JSON});
    return this.http.post<User>(this.configService.getUsersUrl(), body, {headers});
  }
}
