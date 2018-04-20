import { Injectable } from '@angular/core';
import {User} from "../../objects/user";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UserService} from "./user.service";


export const CURRENT_USER: string = 'currentUser';
export const JWT_TOKEN: string = 'jwt';


@Injectable()
export class AuthService {

  private user: User;
  private authenticatedUser = new BehaviorSubject<any>(null);
  private currentUser = this.authenticatedUser.asObservable();

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }


  login(user: User): Observable<any> {
    return this.http.post("/login", user, { observe: 'response' }).map(response => {

      localStorage.setItem(JWT_TOKEN, response.headers.get('authorization'));



      this.userService.getByUsername(user.username).subscribe((data: User) => {
        localStorage.setItem(CURRENT_USER, JSON.stringify(data));
        this.setAuthenticatedUser(data);
        this.router.navigate(['dashboard']);
      });


    }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  setAuthenticatedUser(user: User) {
    this.authenticatedUser.next(user);
  }

}
