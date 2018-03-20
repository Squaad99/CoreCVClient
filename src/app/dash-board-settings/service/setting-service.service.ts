import { Injectable } from '@angular/core';
import { Skill } from "../../objects/skill";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SettingServiceService {

  constructor(private http: HttpClient) { }


  insertSkill(skill: Skill){
    return this.http.post("/api/skill", skill);
  }

  getAllSkills() {
    return this.http.get("/api/skill");
  }

  deleteSkillById(skillId: number) {
    return this.http.delete("/api/skill/delete/" + skillId);
  }

}
