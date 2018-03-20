import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FullCV} from "../../objects/fullCV";

@Injectable()
export class CvService {

  constructor(private http: HttpClient) { }

  insertFullCv(cv: FullCV){
    return this.http.post("/api/cv", cv).subscribe();
  }

}
