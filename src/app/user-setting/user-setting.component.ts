import { Component, OnInit } from '@angular/core';
import {User} from "../objects/user";
import {UserSettingService} from "./service/user-setting.service";

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {

  model: any = {};

  fullUserList: User[];

  constructor(private userSettingService: UserSettingService) { }

  ngOnInit() {
    this.setUserList();
  }

  setUserList(){

    this.userSettingService.getAllUsers().subscribe((users: User[]) => {
      this.fullUserList = users;
    }, error => {
      console.log("Error message");
    }, () => {
      console.log("Finally message")
    });
  }

  insertNewUser(){
    this.userSettingService.insertUser(this.model).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.setUserList();
      this.model = {};
    });
  }

  deleteUserById(id, indexCount){
    this.userSettingService.deleteUserById(id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.fullUserList.splice(indexCount, 1);
    });
  }




}
