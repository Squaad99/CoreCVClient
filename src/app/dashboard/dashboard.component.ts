import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "./service/dashboard.service";
import {FullCvView} from "../objects/FullCvView";
import * as jsPDF from 'jspdf';
import {Education} from "../objects/education";
import {WorkPlace} from "../objects/workPlace";
import {VALUE_EXP1, VALUE_EXP2, VALUE_EXP3} from "../api.values";

declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fullCvList: FullCvView[];
  model: any = {};

  exp1: String = VALUE_EXP1.value;
  exp2: String = VALUE_EXP2.value;
  exp3: String = VALUE_EXP3.value;

  cvSelected: boolean = false;
  eduSelected: boolean = false;
  workSelected: boolean = false;

  postedOrder: boolean = true;
  nameOrder: boolean = true;
  titleOrder: boolean = true;
  emailOrder: boolean = true;

  selectedEducation: Education = {id: null, name: "", start: "", end: "", comment: ""};
  selectedWorkplace: WorkPlace = {id: null, name: "", start: "", end: "", comment: ""};

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadAllCvs();
  }

  loadAllCvs() {
    this.dashboardService.getAllCvs().subscribe((cvs: FullCvView[]) => {
      this.fullCvList = cvs;
    }, error => {}, () => {});
  }

  updateSelectedCv(){
    this.dashboardService.updateProfessionalProfile(this.model).subscribe(() => {
    }, error => {}, () => {
      this.infoModalHeader = "Updated!";
      this.infoModalMessage = "Your Professional profile has been updated!"
      this.showInfoModal();
    });
  }

  updateProfessionalProfile(){
    this.dashboardService.updateProfessionalProfile(this.model).subscribe(() => {
    }, error => {}, () => {
      this.infoModalHeader = "Updated!";
      this.infoModalMessage = "Your Professional profile has been updated!"
      this.showInfoModal();
    });
  }

  updateEduComment(){
    this.dashboardService.updateEduComment(this.selectedEducation).subscribe(() => {
    }, error => {}, () => {
      this.infoModalHeader = "Updated!";
      this.infoModalMessage = "Your Education comment has been updated!"
      this.showInfoModal();
    });
  }

  updateWorkComment(){
    this.dashboardService.updateWorkComment(this.selectedWorkplace).subscribe(() => {
    }, error => {}, () => {
      this.infoModalHeader = "Updated!";
      this.infoModalMessage = "Your Workplace comment has been updated!"
      this.showInfoModal();
    });
  }

  deleteCvPressed(){
    this.infoModalHeader = "Delete Confirmation";
    this.infoModalMessage = "Would you really like to delete this Cv?";
    this.showConfirmationModal();
  }

  selectedCv(cv) {
    this.cvSelected = true;
    this.model = cv;

    this.setPpCharCount();

    if(this.model.educationList.length > 0){
      this.selectedEducation = this.model.educationList[0];
      this.eduSelected = true;
      this.setEduCharCount();
    }else {
      this.selectedEducation = {id: null, name: "", start: "", end: "", comment: ""};
      this.eduSelected = false;
    }

    if(this.model.workPlaceList.length > 0){
      this.selectedWorkplace = this.model.workPlaceList[0];
      this.workSelected = true;
      this.setWorkCharCount();
    }else {
      this.selectedWorkplace = {id: null, name: "", start: "", end: "", comment: ""};
      this.workSelected = false;
    }
  }

  setSelectedEducation(edu){
    this.selectedEducation = edu;
  }

  setSelectedWorkPlace(work){
    this.selectedWorkplace = work;
  }

  name: String;/**/

  lineHeight: number = 0;

  setWorkItPage(pdf){

    pdf.setDrawColor(20, 82, 20);

    pdf.setLineWidth(.6);

    pdf.line(5,2,5,295);

    pdf.setLineWidth(1.4);

    pdf.line(7,2,7,295);

    pdf.setLineWidth(.6);

    pdf.line(9,2,9,295);

    pdf.setLineWidth(.4);
    pdf.setDrawColor(0, 0, 0);

    pdf.line(20,278,190,278);

    pdf.setFontSize(14);
    pdf.setTextColor(46, 184, 46);
    pdf.setFontType("bold");
    pdf.text("Work IT", 160,10);

    pdf.setFontType("bold");
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);

    pdf.text(40, 283, "Stora Åvägen 21");
    pdf.text(40, 288, "436 34 ASKIM");
    pdf.text(140, 283, 'http://www.work-it.se');

    pdf.setFontType("normal");

  }

  createPDF(){

    let pdf = new jsPDF();

    this.setWorkItPage(pdf);

    var pageNumber = 1;
    pdf.setFontSize(10);
    pdf.text(pageNumber+"",105, 290);

    this.lineHeight = 10;

    var image = 'data:image/jpeg;base64,' + this.model.imageBase64;

    var imageElement = document.getElementById("profileImage");

    let imgHeight = imageElement.offsetHeight;
    let imfWidth = imageElement.offsetWidth;
    let imgRatio = imfWidth/imgHeight;

    pdf.addImage(image, 'JPEG', 20, this.lineHeight, 50*imgRatio,50);

    this.lineHeight +=55;

    /*Personal Details*/
    pdf.setFontSize(14);
    pdf.text(this.model.fullName, 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.birthYear.toString(), 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.title, 20,this.lineHeight+6);
    this.lineHeight += 6;

    this.lineHeight += 20;
    pdf.setFontSize(24);
    pdf.text("Professional Profile", 20, this.lineHeight);
    this.lineHeight +=2;
    pdf.line(20,this.lineHeight,190,this.lineHeight);

    this.lineHeight += 4;
    pdf.setFontSize(10);

    if(this.model.comment != null){
      var splitTitle = pdf.splitTextToSize(this.model.comment, 160);

      for(let row of splitTitle){
        this.lineHeight += 4;
        pdf.text(row, 20, this.lineHeight);
        if(this.lineHeight > 270){
          pdf.addPage();
          pdf.setFontSize(10);
          pageNumber++;
          pdf.text(pageNumber+"",105, 290);
          this.setWorkItPage(pdf);
          this.lineHeight = 22;
        }
      }
    }

    this.lineHeight += 20;
    if(this.lineHeight > 200){
      pdf.addPage();
      pdf.setFontSize(10);
      pageNumber++;
      pdf.text(pageNumber+"",105, 290);
      this.setWorkItPage(pdf);
      this.lineHeight = 32;
    }
    pdf.setFontSize(24);
    pdf.text("Skills", 20, this.lineHeight);
    this.lineHeight +=2;
    pdf.line(20,this.lineHeight,190,this.lineHeight);

    pdf.setFontSize(12);
    for(let skill of this.model.fullSkillList){
      this.lineHeight += 10;
      pdf.text(skill.name, 20, this.lineHeight);

      if(skill.exp1){
        pdf.text(this.exp1, 80, this.lineHeight)
      }else if(skill.exp2){
        pdf.text(this.exp2, 80, this.lineHeight)
      }else if(skill.exp3){
        pdf.text(this.exp3, 80, this.lineHeight)
      }

      this.lineHeight +=2;
      pdf.setDrawColor(128, 128, 128);
      pdf.line(20,this.lineHeight, 190, this.lineHeight);
    }

    this.lineHeight += 20;
    if(this.lineHeight > 200){
      pdf.addPage();
      pdf.setFontSize(10);
      pageNumber++;
      pdf.text(pageNumber+"",105, 290);
      this.setWorkItPage(pdf);
      this.lineHeight = 32;
    }

    pdf.setFontSize(24);
    pdf.text("Education", 20, this.lineHeight);
    this.lineHeight +=2;
    pdf.setDrawColor(0, 0, 0);
    pdf.line(20,this.lineHeight,190,this.lineHeight);

    for(let edu of this.model.educationList){

      pdf.setFontSize(14);
      this.lineHeight += 10;
      pdf.text(edu.name + " " + edu.start + " - " + edu.end, 20, this.lineHeight);

      this.lineHeight +=2;
      pdf.setDrawColor(128, 128, 128);
      pdf.line(20,this.lineHeight, 190, this.lineHeight);


      this.lineHeight += 2;
      pdf.setFontSize(10);

      var splitTitle = pdf.splitTextToSize(edu.comment, 160);

      for(let row of splitTitle){
        this.lineHeight += 4;
        pdf.text(row, 20, this.lineHeight);
        if(this.lineHeight > 270){
          pdf.addPage();
          pdf.setFontSize(10);
          pageNumber++;
          pdf.text(pageNumber+"",105, 290);
          this.setWorkItPage(pdf);
          this.lineHeight = 22;
        }
      }
    }

    this.lineHeight += 20;
    if(this.lineHeight > 200){
      pdf.addPage();
      pdf.setFontSize(10);
      pageNumber++;
      pdf.text(pageNumber+"",105, 290);
      this.setWorkItPage(pdf);
      this.lineHeight = 32;
    }

    pdf.setFontSize(24);
    pdf.text("Workplaces", 20, this.lineHeight);
    this.lineHeight +=2;
    pdf.setDrawColor(0, 0, 0);
    pdf.line(20,this.lineHeight,190,this.lineHeight);

    console.log(this.model.workPlaceList);

    for(let workPlace of this.model.workPlaceList){

      pdf.setFontSize(14);
      this.lineHeight += 10;
      pdf.text(workPlace.name + " " + workPlace.start + " - " + workPlace.end, 20, this.lineHeight);

      this.lineHeight +=2;
      pdf.setDrawColor(128, 128, 128);
      pdf.line(20,this.lineHeight, 190, this.lineHeight);

      this.lineHeight += 2;
      pdf.setFontSize(10);

      var splitWorkPlace = pdf.splitTextToSize(workPlace.comment, 160);

      for(let row of splitWorkPlace){
        this.lineHeight += 4;
        pdf.text(row, 20, this.lineHeight);
        if(this.lineHeight > 270){
          pdf.addPage();
          pdf.setFontSize(10);
          pageNumber++;
          pdf.text(pageNumber+"",105, 290);
          this.setWorkItPage(pdf);
          this.lineHeight = 22;
        }
      }
    }

    pdf.save(this.model.fullName+"CV");
  }

  sortName() {
    if(this.nameOrder == true){
      this.nameOrder = false;
      this.fullCvList.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }else {
      this.nameOrder = true;
      this.fullCvList.sort((a, b) => a.fullName.localeCompare(b.fullName)).reverse();
    }
  }

  sortTitle() {
    if(this.titleOrder == true){
      this.titleOrder = false;
      this.fullCvList.sort((a, b) => a.title.localeCompare(b.title)).reverse();
    }else {
      this.titleOrder= true;
      this.fullCvList.sort((a, b) => a.title.localeCompare(b.title)).reverse();
    }
  }

  sortEmail() {
    if(this.emailOrder == true){
      this.emailOrder = false;
      this.fullCvList.sort((a, b) => a.email.localeCompare(b.email));
    }else {
      this.emailOrder = true;
      this.fullCvList.sort((a, b) => a.email.localeCompare(b.email)).reverse();
    }
  }

  sortPosted() {
    if(this.postedOrder == true){
      this.postedOrder = false;
      this.fullCvList.sort((a, b) => a.posted.localeCompare(b.posted)).reverse();
    }else {
      this.postedOrder = true;
      this.fullCvList.sort((a, b) => a.posted.localeCompare(b.posted));
    }
  }

  infoModalHeader: String = "";
  infoModalMessage: String = "";

  @ViewChild('infoModal') modal:ElementRef;
  showInfoModal(){
    $(this.modal.nativeElement).modal('show');

  }

  @ViewChild('confirmationModal') confirmationModal:ElementRef;
  showConfirmationModal(){
    $(this.confirmationModal.nativeElement).modal({view: 'show', backdrop: 'static',
      keyboard: false});
  }

  deleteCv(){
    this.dashboardService.deleteCvById(this.model.id).subscribe(() => {
    }, error => {}, () => {
      location.reload();
      this.infoModalHeader = "Cv Deleted!";
      this.infoModalMessage = "Your Cv is now deleted!"
      this.showInfoModal();
    });;
  }

  ppCharCount: Number = 0;

  setPpCharCount(){
    if(this.model.comment != null){
      this.ppCharCount = this.model.comment.length;
    }else {
      this.ppCharCount = 0;
    }
  }

  eduCharCount: Number = 0;

  setEduCharCount(){
    if(this.selectedEducation.comment!= null){
      this.eduCharCount = this.selectedEducation.comment.length;
    }else {
      this.eduCharCount = 0;
    }
  }

  workCharCount: Number = 0;

  setWorkCharCount(){
    if(this.model.comment != null){
      this.workCharCount = this.selectedWorkplace.comment.length;
    }else {
      this.workCharCount = 0;
    }
  }


}
