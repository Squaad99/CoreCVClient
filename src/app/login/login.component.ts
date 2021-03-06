import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private authService: AuthService) { }

  model: any = {};
  unauthorized: boolean = false;

  loading = false;
  error = '';


  ngOnInit() {
  }

  login(){

    console.log(this.model);

    this.authService.login(this.model).subscribe(() => {}, error => {
      this.unauthorized = true;
    });


    /*this.router.navigate(['dashboard']);*/


  }


}
