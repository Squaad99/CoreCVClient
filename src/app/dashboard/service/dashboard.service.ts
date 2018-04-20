import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FullCV} from "../../objects/fullCV";
import {Education} from "../../objects/education";
import {WorkPlace} from "../../objects/workPlace";

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAllCvs() {
    return this.http.get("/api/cv");
  }

  updateProfessionalProfile(cv: FullCV){
   return this.http.put("/api/cv", cv)
  }

  updateEduComment(edu: Education){
    return this.http.put("/api/edu", edu);

  }

  updateWorkComment(work: WorkPlace){
    return this.http.put("/api/work", work);
  }

  deleteCvById(cvId: number) {
    return this.http.delete("/api/cv/" + cvId);
  }

}
