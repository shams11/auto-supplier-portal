import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/models/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) {
  }

  getUsers() {
    return this.httpClient.get<User[]>(this.configService.getUsersUrl());
  }
}
