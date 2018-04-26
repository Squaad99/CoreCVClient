import {Component, OnInit} from '@angular/core';
import {SettingServiceService} from "./service/setting-service.service";
import {Skill} from "../objects/skill";
import {falseIfMissing} from "protractor/built/util";

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

  viewListOne: boolean = true;
  viewListTwo: boolean = true;
  viewListThree: boolean = true;
  viewListFour: boolean = true;
  viewListFive: boolean = true;
  viewListSix: boolean = true;
  viewListSeven: boolean = true;
  viewListEight: boolean = true;

  constructor(private settingService: SettingServiceService) {}

  ngOnInit() {
    this.loadAllSkill();
    this.viewListOne = true;
    this.viewListTwo = false;
    this.viewListThree = false;
    this.viewListFour = false;
    this.viewListFive = false;
    this.viewListSix = false;
    this.viewListSeven = false;
    this.viewListEight = false;
  }

  submitSkill() {
    this.settingService.insertSkill(this.model).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.loadAllSkill();
      this.model.name = "";
    });
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

  deleteSkillByIdOne(skill, indexCount) {
    this.settingService.deleteSkillById(skill.id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.skillListOne.splice(indexCount, 1);
    });
  }

  deleteSkillByIdTwo(skill, indexCount) {
    this.settingService.deleteSkillById(skill.id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.skillListTwo.splice(indexCount, 1);
    });
  }

  deleteSkillByIdThree(skill, indexCount) {
    this.settingService.deleteSkillById(skill.id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.skillListThree.splice(indexCount, 1);
    });
  }

  deleteSkillByIdFour(skill, indexCount) {
    this.settingService.deleteSkillById(skill.id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.skillListFour.splice(indexCount, 1);
    });
  }

  deleteSkillByIdFive(skill, indexCount) {
    this.settingService.deleteSkillById(skill.id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.skillListFive.splice(indexCount, 1);
    });
  }

  deleteSkillByIdSix(skill, indexCount) {
    this.settingService.deleteSkillById(skill.id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.skillListSix.splice(indexCount, 1);
    });
  }

  deleteSkillByIdSeven(skill, indexCount) {
    this.settingService.deleteSkillById(skill.id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.skillListSeven.splice(indexCount, 1);
    });
  }

  deleteSkillByIdEight(skill, indexCount) {
    this.settingService.deleteSkillById(skill.id).subscribe(() => {}, error => {
      console.log("Server Error");
    }, () => {
      this.skillListEight.splice(indexCount, 1);
    });
  }

  pageOne(){
    this.viewListOne = true;
    this.viewListTwo = false;
    this.viewListThree = false;
    this.viewListFour = false;
    this.viewListFive = false;
    this.viewListSix = false;
    this.viewListSeven = false;
    this.viewListEight = false;
  }

  pageTwo(){
    this.viewListOne = false;
    this.viewListTwo = true;
    this.viewListThree = false;
    this.viewListFour = false;
    this.viewListFive = false;
    this.viewListSix = false;
    this.viewListSeven = false;
    this.viewListEight = false;
  }

  pageThree(){
    this.viewListOne = false;
    this.viewListTwo = false;
    this.viewListThree = true;
    this.viewListFour = false;
    this.viewListFive = false;
    this.viewListSix = false;
    this.viewListSeven = false;
    this.viewListEight = false;
  }

  pageFour(){
    this.viewListOne = false;
    this.viewListTwo = false;
    this.viewListThree = false;
    this.viewListFour = true;
    this.viewListFive = false;
    this.viewListSix = false;
    this.viewListSeven = false;
    this.viewListEight = false;
  }

  pageFive(){
    this.viewListOne = false;
    this.viewListTwo = false;
    this.viewListThree = false;
    this.viewListFour = false;
    this.viewListFive = true;
    this.viewListSix = false;
    this.viewListSeven = false;
    this.viewListEight = false;
  }

  pageSix(){
    this.viewListOne = false;
    this.viewListTwo = false;
    this.viewListThree = false;
    this.viewListFour = false;
    this.viewListFive = false;
    this.viewListSix = true;
    this.viewListSeven = false;
    this.viewListEight = false;
  }

  pageSeven(){
    this.viewListOne = false;
    this.viewListTwo = false;
    this.viewListThree = false;
    this.viewListFour = false;
    this.viewListFive = false;
    this.viewListSix = false;
    this.viewListSeven = true;
    this.viewListEight = false;
  }

  pageEight(){
    this.viewListOne = false;
    this.viewListTwo = false;
    this.viewListThree = false;
    this.viewListFour = false;
    this.viewListFive = false;
    this.viewListSix = false;
    this.viewListSeven = false;
    this.viewListEight = true;
  }

}
