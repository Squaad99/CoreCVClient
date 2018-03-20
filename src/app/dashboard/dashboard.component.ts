import { Component, OnInit, Input, HostListener } from '@angular/core';
import {Cv} from "../cv";
import {CvService} from "../cv-form/service/cv.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CvService]
})
export class DashboardComponent implements OnInit {

  private  cvs: Cv[];

  constructor(private cvService:CvService) {

  }

  ngOnInit() {
    this.getAllCv();
  }

  getAllCv() {

  }

  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

}
