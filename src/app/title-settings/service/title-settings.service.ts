import { Injectable } from '@angular/core';
import {Title} from "../../objects/title";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TitleSettingsService {

  constructor(private http: HttpClient) { }

  insertTitle(title: Title){
    return this.http.post("/api/title", title);
  }

  getAllTitles() {
    return this.http.get("/api/title");
  }

  deleteTitleById(titleId: number) {
    return this.http.delete("/api/title/delete/" + titleId);
  }

}
