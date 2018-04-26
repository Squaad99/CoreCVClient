import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../objects/user";

@Injectable()
export class UserSettingService {

  constructor(private http: HttpClient) { }

  insertUser(user: User){
    return this.http.post("/api/users", user);
  }

  getAllUsers() {
    return this.http.get("/api/users");
  }

  deleteUserById(userId: number) {
    return this.http.delete("/api/users/delete/" + userId);
  }

}
