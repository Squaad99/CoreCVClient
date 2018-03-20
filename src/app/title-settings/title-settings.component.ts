import { Component, OnInit } from '@angular/core';
import {TitleSettingsService} from "./service/title-settings.service";
import {Title} from "../objects/title";

@Component({
  selector: 'app-title-settings',
  templateUrl: './title-settings.component.html',
  styleUrls: ['./title-settings.component.css']
})
export class TitleSettingsComponent implements OnInit {

  model: any = {};
  fullTitleList: Title[];

  constructor(private titleSettingsService: TitleSettingsService) { }

  ngOnInit() {
    this.getAllTitles();
  }

  submitTitle(){
    this.titleSettingsService.insertTitle(this.model).subscribe();
    this.model = {};
    this.getAllTitles();
  }

  getAllTitles(){
    this.titleSettingsService.getAllTitles().subscribe((titles: Title[]) => {
      this.fullTitleList = titles;
    }, error => {
      console.log("Error message");
    }, () => {
      console.log("Finally message")
    });
  }

  deleteTitleById(title){
    this.titleSettingsService.deleteTitleById(title.id).subscribe();
    location.reload();
    this.getAllTitles();
  }


}
