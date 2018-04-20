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
import {VALUE_EXP1, VALUE_EXP2, VALUE_EXP3} from "../api.values";

declare let $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent implements OnInit {

  exp1: String = VALUE_EXP1.value;
  exp2: String = VALUE_EXP2.value;
  exp3: String = VALUE_EXP3.value;

  model: any = {};

  fullTitleList: Title[];

  birthYearList = [];
  YearList = [];

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

  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.setYearValue();
    this.getAllSkills();
    this.getAllTitles();
  }

  setYearValue() {
    var i;
    for (i = 18; i < 100; i++) {
      this.birthYearList.push(this.currentYear - i);
    }

    var x;
    for (x = 0; x < 60; x++) {
      this.YearList.push(this.currentYear - x);
    }
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
        this.showValidationModal();
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
        this.showValidationModal();
        return false;
      }else if(edu.start.length < 1){
        this.modalMessage = "Please enter start for education.";
        this.showValidationModal();
        return false;
      }else if(edu.end.length < 1){
        this.modalMessage = "Please enter end for education.";
        this.showValidationModal();
        return false;
      }else if(edu.start > edu.end){
        this.modalMessage = "Start year must be earlier than end year, education:" + edu.name;
        this.showValidationModal();
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
        this.showValidationModal();
        return false;
      }else if(workplace.start.length < 1){
        this.modalMessage = "Please enter start for workplace.";
        this.showValidationModal();
        return false;
      }else if(workplace.end.length < 1){
        this.modalMessage = "Please enter end for workplace.";
        this.showValidationModal();
        return false;
      }else if(workplace.start > workplace.end){
        this.modalMessage = "Start year must be earlier than end year, workplace:" + workplace.name;
        this.showValidationModal();
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
    this.showExitModal();
  }

  private base64textString: String = '';

  fileSelected: boolean = false;
  fileFormat: boolean = true;
  fileSize: boolean = true;

  imageUpload(event) {

    this.fileSelected = true;

    const files = event.target.files;
    const file = files[0];

    console.log(file);

    if(file.type == "image/jpeg"){
      this.fileFormat = true;
    }else {
      this.fileFormat = false;
      return;
    }

    if(file.size < 1000000){
      this.fileSize = true;
    }else{
      this.fileSize = false;
      return;
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
  showValidationModal(){
    $(this.modal.nativeElement).modal({view: 'show'});
  }

  @ViewChild('exitModal') modal2:ElementRef;
  showExitModal(){
    $(this.modal2.nativeElement).modal({view: 'show', backdrop: 'static',
      keyboard: false});
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

  goToWorkIt(){
    window.location.href='http://www.work-it.se/';
  }

}
