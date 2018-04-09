import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from "../objects/title";
import {TitleSettingsService} from "../title-settings/service/title-settings.service";
import {SettingServiceService} from "../dash-board-settings/service/setting-service.service";
import {Skill} from "../objects/skill";
import {Education} from "../objects/education";
import {WorkPlace} from "../objects/workPlace";
import {CvService} from "./service/cv.service";
import {HttpClient} from "@angular/common/http";
import * as jQuery from 'jquery';

declare let $: any;

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
  skillListSix: Skill[];
  skillListSeven: Skill[];
  skillListEight: Skill[];

  educationList: Education[] = [];
  workplaceList: WorkPlace[] = [];
  doneSkillList: Skill[] = [];

  constructor(private http: HttpClient, private titleSettingsService: TitleSettingsService, private settingService: SettingServiceService, private cvService: CvService) {
  }

  ngOnInit() {
    this.setYearValue();
    this.getAllSkills();
    this.getAllTitles();
  }
  countrySelected = "";

  receiveMessage($event) {
    this.countrySelected = $event;
    console.log("rec: " + this.countrySelected);
    this.model.cvCountry = this.countrySelected;
  }

  setYearValue() {
    var i;
    for (i = 0; i < 50; i++) {
      this.yearValue.push(2018 - i);
    }
    console.log(this.yearValue);
  }

  addEducation() {
    this.educationList.push({id: null, name: "", start: "", end: "", comment: ""});
  }

  removeEducation(index) {
    this.educationList.splice(index, 1);
  }

  addWorkplace() {
    this.workplaceList.push({id: null, name: "", start: "", end: "", comment: ""});
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
      this.skillListSix = [];
      this.skillListSeven = [];
      this.skillListEight = [];

      for (let f of this.fullSkillList) {
        if (f.type == 1) {
          this.skillListOne.push({
            id: f.id,
            name: f.name,
            type: f.type,
            selected: false,
            exp1: false,
            exp2: false,
            exp3: false
          });
        } else if (f.type == 2) {
          this.skillListTwo.push({
            id: f.id,
            name: f.name,
            type: f.type,
            selected: false,
            exp1: false,
            exp2: false,
            exp3: false
          });
        } else if (f.type == 3) {
          this.skillListThree.push({
            id: f.id,
            name: f.name,
            type: f.type,
            selected: false,
            exp1: false,
            exp2: false,
            exp3: false
          });
        } else if (f.type == 4) {
          this.skillListFour.push({
            id: f.id,
            name: f.name,
            type: f.type,
            selected: false,
            exp1: false,
            exp2: false,
            exp3: false
          });
        } else if (f.type == 5) {
          this.skillListFive.push({
            id: f.id,
            name: f.name,
            type: f.type,
            selected: false,
            exp1: false,
            exp2: false,
            exp3: false
          });
        }else if (f.type == 6) {
          this.skillListSix.push({
            id: f.id,
            name: f.name,
            type: f.type,
            selected: false,
            exp1: false,
            exp2: false,
            exp3: false
          });
        }else if (f.type == 7) {
          this.skillListSeven.push({
            id: f.id,
            name: f.name,
            type: f.type,
            selected: false,
            exp1: false,
            exp2: false,
            exp3: false
          });
        }else if (f.type == 8) {
          this.skillListEight.push({
            id: f.id,
            name: f.name,
            type: f.type,
            selected: false,
            exp1: false,
            exp2: false,
            exp3: false
          });
        }

        this.skillListOne.sort((a, b) => a.name.localeCompare(b.name));
        this.skillListTwo.sort((a, b) => a.name.localeCompare(b.name));
        this.skillListThree.sort((a, b) => a.name.localeCompare(b.name));
        this.skillListFour.sort((a, b) => a.name.localeCompare(b.name));
        this.skillListFive.sort((a, b) => a.name.localeCompare(b.name));
        this.skillListSix.sort((a, b) => a.name.localeCompare(b.name));
        this.skillListSeven.sort((a, b) => a.name.localeCompare(b.name));
        this.skillListEight.sort((a, b) => a.name.localeCompare(b.name));

      }
    }, error => {
      console.log("Error message");
    }, () => {
      console.log("Finally message")
    });
  }

  ppLength: number = 0;

  setProfessionalProfileLength(c){
    this.ppLength = c.length;
  }

  modalHeader: String = "";
  modalMessage: String = "";

  validateSkills(){

    this.doneSkillList = [];
    this.model.fullSkillList = [];

    for (let f of this.skillListOne) {
      if (f.selected == true) {
        this.doneSkillList.push({
          id: f.id,
          name: f.name,
          type: f.type,
          selected: f.selected,
          exp1: f.exp1,
          exp2: f.exp2,
          exp3: f.exp3
        });
      }
    }

    for (let f of this.skillListTwo) {
      if (f.selected == true) {
        this.doneSkillList.push({
          id: f.id,
          name: f.name,
          type: f.type,
          selected: f.selected,
          exp1: f.exp1,
          exp2: f.exp2,
          exp3: f.exp3
        });
      }
    }

    for (let f of this.skillListThree) {
      if (f.selected == true) {
        this.doneSkillList.push({
          id: f.id,
          name: f.name,
          type: f.type,
          selected: f.selected,
          exp1: f.exp1,
          exp2: f.exp2,
          exp3: f.exp3
        });
      }
    }

    for (let f of this.skillListFour) {
      if (f.selected == true) {
        this.doneSkillList.push({
          id: f.id,
          name: f.name,
          type: f.type,
          selected: f.selected,
          exp1: f.exp1,
          exp2: f.exp2,
          exp3: f.exp3
        });
      }
    }

    for (let f of this.skillListFive) {
      if (f.selected == true) {
        this.doneSkillList.push({
          id: f.id,
          name: f.name,
          type: f.type,
          selected: f.selected,
          exp1: f.exp1,
          exp2: f.exp2,
          exp3: f.exp3
        });
      }
    }

    for (let f of this.skillListSix) {
      if (f.selected == true) {
        this.doneSkillList.push({
          id: f.id,
          name: f.name,
          type: f.type,
          selected: f.selected,
          exp1: f.exp1,
          exp2: f.exp2,
          exp3: f.exp3
        });
      }
    }

    for (let f of this.skillListSeven) {
      if (f.selected == true) {
        this.doneSkillList.push({
          id: f.id,
          name: f.name,
          type: f.type,
          selected: f.selected,
          exp1: f.exp1,
          exp2: f.exp2,
          exp3: f.exp3
        });
      }
    }

    for (let f of this.skillListEight) {
      if (f.selected == true) {
        this.doneSkillList.push({
          id: f.id,
          name: f.name,
          type: f.type,
          selected: f.selected,
          exp1: f.exp1,
          exp2: f.exp2,
          exp3: f.exp3
        });
      }
    }

    this.model.fullSkillList = this.doneSkillList;

    this.modalHeader = "Missing information!"
    for(let skill of this.doneSkillList){
      if(skill.exp1 == false && skill.exp2 == false && skill.exp3 == false){
        this.modalMessage = "Please enter experience for " + skill.name+".";
        this.showSkillValidationModal();
        return false;
      }
    }
    return true;
  }

  validateEducation(){

    this.modalHeader = "Missing information!"

    for(let edu of this.educationList){
      if(edu.name.length < 1){
        this.modalMessage = "Please enter name for education.";
        this.showSkillValidationModal();
        return false;
      }else if(edu.start.length < 1){
        this.modalMessage = "Please enter start for education.";
        this.showSkillValidationModal();
        return false;
      }else if(edu.end.length < 1){
        this.modalMessage = "Please enter end for education.";
        this.showSkillValidationModal();
        return false;
      }else if(edu.start > edu.end){
        this.modalMessage = "Start year must be before end year for education: " + edu.name;
        this.showSkillValidationModal();
        return false;
      }
    }
    return true;
  }

  validateWorkplace(){

    this.modalHeader = "Missing information!"

    for(let workplace of this.workplaceList){
      if(workplace.name.length < 1){
        this.modalMessage = "Please enter name for workplace.";
        this.showSkillValidationModal();
        return false;
      }else if(workplace.start.length < 1){
        this.modalMessage = "Please enter start for workplace.";
        this.showSkillValidationModal();
        return false;
      }else if(workplace.end.length < 1){
        this.modalMessage = "Please enter end for workplace.";
        this.showSkillValidationModal();
        return false;
      }else if(workplace.start > workplace.end){
        this.modalMessage = "Start year must be before end year for workplace: " + workplace.name;
        this.showSkillValidationModal();
        return false;
      }
    }
    return true;
  }

  submitCv() {

    if(this.validateSkills() == false){
      return;
    }

    if(this.validateEducation() == false){
      return;
    }

    if(this.validateWorkplace() == false){
      return;
    }

    this.model.educationList = this.educationList;
    this.model.workPlaceList = this.workplaceList;

    this.cvService.insertFullCv(this.model);

    this.modalHeader = "CV submitted!";
    this.modalMessage = "We've received your CV! We at Work-it will be in contact!";
    this.showSkillValidationModal();

    window.location.href='http://www.work-it.se/';
  }

  private base64textString: String = '';

  fileFormat: boolean;

  imageUpload(event) {

    const files = event.target.files;
    const file = files[0];

    if(file.type == "image/png" || file.type == "image/jpeg"){
      this.fileFormat = false;
    }else {
      this.fileFormat = true;
    }

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.model.imageBase64 = this.base64textString;
  }

  acceptedTerms: boolean = false;

  @ViewChild('validationModal') modal:ElementRef;
  showSkillValidationModal(){
    $(this.modal.nativeElement).modal({view: 'show', backdrop: 'static',
      keyboard: false});

  }


}
