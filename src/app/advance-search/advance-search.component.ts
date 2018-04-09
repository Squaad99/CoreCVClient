import { Component, OnInit } from '@angular/core';
import {Skill} from "../objects/skill";
import {SettingServiceService} from "../dash-board-settings/service/setting-service.service";

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  fullSkillList: Skill[];
  filterSkillList: Skill[] = [];


  constructor(private settingService: SettingServiceService) { }



  ngOnInit() {
    this.getAllSkills();
  }

  getAllSkills() {
    this.settingService.getAllSkills().subscribe((skills: Skill[]) => {

      this.fullSkillList = skills;

      this.fullSkillList.sort((a, b) => a.name.localeCompare(b.name));


      for(let skill of this.fullSkillList){
        skill.exp1 = true;
        skill.exp2 = false;
        skill.exp3 = false;
      }

    }, error => {
      console.log("Error message");
    }, () => {
      console.log("Finally message")
    });
  }

  addSkillToFilter(skill, i){
    this.filterSkillList.push(skill);
    this.fullSkillList.splice(i, 1);

    this.filterSkillList.sort((a, b) => a.name.localeCompare(b.name));
    this.fullSkillList.sort((a, b) => a.name.localeCompare(b.name));
  }

  removeSkillFromFilter(skill, i){
    this.fullSkillList.push(skill);
    this.filterSkillList.splice(i, 1);

    this.filterSkillList.sort((a, b) => a.name.localeCompare(b.name));
    this.fullSkillList.sort((a, b) => a.name.localeCompare(b.name));
  }


  radioOne(skill){

    skill.exp1 = true;
    skill.exp2 = false;
    skill.exp3 = false;

  }

  radioTwo(skill){

    skill.exp1 = false;
    skill.exp2 = true;
    skill.exp3 = false;

  }

  radioThree(skill){

    skill.exp1 = false;
    skill.exp2 = false;
    skill.exp3 = true;

  }


}
