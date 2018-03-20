import {Component, OnInit} from '@angular/core';
import {Title} from "../objects/title";
import {TitleSettingsService} from "../title-settings/service/title-settings.service";
import {SettingServiceService} from "../dash-board-settings/service/setting-service.service";
import {Skill} from "../objects/skill";
import {Education} from "../objects/education";
import {WorkPlace} from "../objects/workPlace";
import {CvService} from "./service/cv.service";

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent implements OnInit {

  model: any = {};

  fullTitleList: Title[];

  yearValue = [];

  fullSkillList: Skill[];

  skillListOne: Skill[];
  skillListTwo: Skill[];
  skillListThree: Skill[];
  skillListFour: Skill[];
  skillListFive: Skill[];

  educationList: Education[] = [];
  workplaceList: WorkPlace[] = [];
  doneSkillList: Skill[] = [];

  constructor(private titleSettingsService: TitleSettingsService, private settingService: SettingServiceService, private cvService: CvService) {
  }

  ngOnInit() {
    this.setYearValue();
    this.getAllSkills();
    this.getAllTitles()
  }


  setYearValue() {
    var i;
    for (i = 0; i < 50; i++) {
      this.yearValue.push(2018 - i);
    }
    console.log(this.yearValue);
  }


  addEducation() {
    this.educationList.push({provider: "", start: "", end: "", comment: ""});
    console.log(this.educationList);
  }

  removeEducation(index) {
    this.educationList.splice(index, 1);
  }

  addWorkplace() {
    this.workplaceList.push({name: "", start: "", end: "", comment: ""});
    console.log(this.workplaceList);
  }

  removeWorkplace(index) {
    this.workplaceList.splice(index, 1);
  }

  getAllTitles() {
    this.titleSettingsService.getAllTitles().subscribe((titles: Title[]) => {
      this.fullTitleList = titles;
    }, error => {
      console.log("Error message");
    }, () => {
      console.log("Finally message")
    });
  }

  getAllSkills() {
    this.settingService.getAllSkills().subscribe((skills: Skill[]) => {

      this.fullSkillList = skills;

      this.skillListOne = [];
      this.skillListTwo = [];
      this.skillListThree = [];
      this.skillListFour = [];
      this.skillListFive = [];

      for (let f of this.fullSkillList) {
        if (f.type == 1) {
          this.skillListOne.push({id: f.id, name: f.name, type: f.type, selected: false, exp1: false, exp2: false, exp3: false});
        } else if (f.type == 2) {
          this.skillListTwo.push({id: f.id, name: f.name, type: f.type, selected: false, exp1: false, exp2: false, exp3: false});
        } else if (f.type == 3) {
          this.skillListThree.push({id: f.id, name: f.name, type: f.type, selected: false, exp1: false, exp2: false, exp3: false});
        } else if (f.type == 4) {
          this.skillListFour.push({id: f.id, name: f.name, type: f.type, selected: false, exp1: false, exp2: false, exp3: false});
        } else if (f.type == 5) {
          this.skillListFive.push({id: f.id, name: f.name, type: f.type, selected: false, exp1: false, exp2: false, exp3: false});
        }
      }
    }, error => {
      console.log("Error message");
    }, () => {
      console.log("Finally message")
    });

  }


  submitCv(){
    this.model.educationList = this.educationList;
    this.model.workPlaceList = this.workplaceList;

    for(let f of this.skillListOne){
      if(f.selected == true){
        this.doneSkillList.push({id: f.id, name: f.name, type: f.type, selected: f.selected, exp1: f.exp1, exp2: f.exp2, exp3: f.exp3});
      }
    }

    for(let f of this.skillListTwo){
      if(f.selected == true){
        this.doneSkillList.push({id: f.id, name: f.name, type: f.type, selected: f.selected, exp1: f.exp1, exp2: f.exp2, exp3: f.exp3});
      }
    }

    for(let f of this.skillListThree){
      if(f.selected == true){
        this.doneSkillList.push({id: f.id, name: f.name, type: f.type, selected: f.selected, exp1: f.exp1, exp2: f.exp2, exp3: f.exp3});
      }
    }

    for(let f of this.skillListFour){
      if(f.selected == true){
        this.doneSkillList.push({id: f.id, name: f.name, type: f.type, selected: f.selected, exp1: f.exp1, exp2: f.exp2, exp3: f.exp3});
      }
    }

    for(let f of this.skillListFive){
      if(f.selected == true){
        this.doneSkillList.push({id: f.id, name: f.name, type: f.type, selected: f.selected, exp1: f.exp1, exp2: f.exp2, exp3: f.exp3});
      }
    }

    this.model.fullSkillList = this.doneSkillList;

    console.log(this.model);

    this.cvService.insertFullCv(this.model);

  }

}
