import { Component, OnInit } from '@angular/core';
import {Skill} from "../objects/skill";
import {SettingServiceService} from "../dash-board-settings/service/setting-service.service";
import {VALUE_EXP1, VALUE_EXP2, VALUE_EXP3} from "../api.values";
import {FullCvView} from "../objects/FullCvView";
import {DashboardService} from "../dashboard/service/dashboard.service";

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  exp1: String = VALUE_EXP1.value;
  exp2: String = VALUE_EXP2.value;
  exp3: String = VALUE_EXP3.value;

  fullSkillList: Skill[];
  filterSkillList: Skill[] = [];

  fullCvList: FullCvView[];
  filteredCvList: FullCvView[];

  public searchString: string;


  constructor(private settingService: SettingServiceService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllSkills();
    this.getAllCv();
    console.log(this.filteredCvList);
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
    }, () => {});
  }

  addSkillToFilter(skill, i){
    this.filterSkillList.push(skill);
    this.fullSkillList.splice(i, 1);

    this.filterSkillList.sort((a, b) => a.name.localeCompare(b.name));
    this.fullSkillList.sort((a, b) => a.name.localeCompare(b.name));

    this.filterCvAfterSkill();
  }

  removeSkillFromFilter(skill, i){
    this.fullSkillList.push(skill);
    this.filterSkillList.splice(i, 1);

    this.filterSkillList.sort((a, b) => a.name.localeCompare(b.name));
    this.fullSkillList.sort((a, b) => a.name.localeCompare(b.name));

    this.filterCvAfterSkill();
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

  getAllCv(){
    this.dashboardService.getAllCvs().subscribe((cvs: FullCvView[]) => {this.fullCvList = cvs;}, error => {}, () => {
      this.filterCvAfterSkill();
      console.log(this.filteredCvList);
    });
  }

  filterCvAfterSkill(){

    this.filteredCvList = [];

    var allFilterSize = this.filterSkillList.length;



    for(let cv of this.fullCvList){

      var cvSkillReqTotal = 0;
      var cvSkillReq = 0;
      var cvSkillExp = 0;


      for(let skillReqItem of this.filterSkillList){

        if(skillReqItem.exp1 == true){
          cvSkillReq = 1;
        }else if(skillReqItem.exp2 == true){
          cvSkillReq = 2;
        }else if(skillReqItem.exp3 == true){
          cvSkillReq = 3;
        }
        
        for(let currentSkill of cv.fullSkillList){

          if(currentSkill.name == skillReqItem.name){
            if(currentSkill.exp1 == true){
              cvSkillExp = 1;
            }else if (currentSkill.exp2 == true){
              cvSkillExp = 2;
            }else if (currentSkill.exp3 == true){
              cvSkillExp = 3;
            }

            if(cvSkillExp >= cvSkillReq){
              cvSkillReqTotal++;
            }

          }
        }
      }

      if(cvSkillReqTotal == allFilterSize){
        this.filteredCvList.push(cv);
      }

    }
  }

}
