import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getByUsername(username: string) {
    return this.http.get('/api/users/' + username + '/');
  }


}
