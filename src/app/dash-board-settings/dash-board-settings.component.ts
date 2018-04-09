import {Component, OnInit} from '@angular/core';
import {SettingServiceService} from "./service/setting-service.service";
import {Skill} from "../objects/skill";

@Component({
  selector: 'app-dash-board-settings',
  templateUrl: './dash-board-settings.component.html',
  styleUrls: ['./dash-board-settings.component.css']
})
export class DashBoardSettingsComponent implements OnInit {


  model: any = {};

  fullSkillList: Skill[];

  skillListOne: Skill[];
  skillListTwo: Skill[];
  skillListThree: Skill[];
  skillListFour: Skill[];
  skillListFive: Skill[];
  skillListSix: Skill[];
  skillListSeven: Skill[];
  skillListEight: Skill[];


  constructor(private settingService: SettingServiceService) {
  }

  ngOnInit() {
    this.loadAllSkill();
  }

  submitSkill() {
    this.settingService.insertSkill(this.model).subscribe();
    this.model = {};
    location.reload();
    this.loadAllSkill();
  }

  loadAllSkill() {
    this.settingService.getAllSkills().subscribe((skills: Skill[]) => {

      this.fullSkillList = skills;

      this.skillListOne = [];
      this.skillListTwo = [];
      this.skillListThree = [];
      this.skillListFour = [];
      this.skillListFive = [];
      this.skillListSix = [];
      this.skillListSeven = [];
      this.skillListEight = [];

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
        } else if (f.type == 6) {
          this.skillListSix.push({id: f.id, name: f.name, type: f.type, selected: false, exp1: false, exp2: false, exp3: false});
        } else if (f.type == 7) {
          this.skillListSeven.push({id: f.id, name: f.name, type: f.type, selected: false, exp1: false, exp2: false, exp3: false});
        } else if (f.type == 8) {
          this.skillListEight.push({id: f.id, name: f.name, type: f.type, selected: false, exp1: false, exp2: false, exp3: false});
        }
      }

      this.skillListOne.sort((a, b) => a.name.localeCompare(b.name));
      this.skillListTwo.sort((a, b) => a.name.localeCompare(b.name));
      this.skillListThree.sort((a, b) => a.name.localeCompare(b.name));
      this.skillListFour.sort((a, b) => a.name.localeCompare(b.name));
      this.skillListFive.sort((a, b) => a.name.localeCompare(b.name));
      this.skillListSix.sort((a, b) => a.name.localeCompare(b.name));
      this.skillListSeven.sort((a, b) => a.name.localeCompare(b.name));
      this.skillListEight.sort((a, b) => a.name.localeCompare(b.name));



    }, error => {
      console.log("Error message");
    }, () => {
      console.log("Finally message")
    });
  }

  deleteSkillById(skill) {
    this.settingService.deleteSkillById(skill.id).subscribe();
    location.reload();
    this.loadAllSkill();
  }

}
