import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../common/models/user';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

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
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<User>(this.configService.getUsersUrl(), body, {headers});
  }
}
