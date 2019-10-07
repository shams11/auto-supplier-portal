import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../common/models/user';
import { ConfigService } from './config.service';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) {
  }

  getUsers() {
    let username = 'shams';
    let password = 'shams';
    const headers = new HttpHeaders({ Authorization: Constants.BASIC_AUTH_TYPE + btoa(username + ':' + password) });
    return this.httpClient.get<User[]>(this.configService.getUsersUrl(), { headers });
  }
}
