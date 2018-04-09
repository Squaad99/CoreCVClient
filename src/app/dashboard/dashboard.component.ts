import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "./service/dashboard.service";
import {FullCvView} from "../objects/FullCvView";
import * as jsPDF from 'jspdf';
import {Education} from "../objects/education";
import {WorkPlace} from "../objects/workPlace";

declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fullCvList: FullCvView[];
  model: any = {};

  cvSelected: boolean = false;
  eduSelected: boolean = false;
  workSelected: boolean = false;

  postedOrder: boolean = true;
  nameOrder: boolean = true;
  titleOrder: boolean = true;
  emailOrder: boolean = true;

  selectedEducation: Education = {id: null, name: "", start: "", end: "", comment: ""};
  selectedWorkplace: WorkPlace = {id: null, name: "", start: "", end: "", comment: ""};

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.loadAllCvs();
  }

  loadAllCvs() {
    this.dashboardService.getAllCvs().subscribe((cvs: FullCvView[]) => {
      this.fullCvList = cvs;
    }, error => {}, () => {});
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

  deleteCv(){
    this.infoModalHeader = "Delete Confirmation";
    this.infoModalMessage = "Would you really like to delete this Cv?";
    this.showConfirmationModal();
  }

  selectedCv(cv) {
    this.cvSelected = true;
    this.model = cv;

    if(this.model.educationList.length > 0){
      this.selectedEducation = this.model.educationList[0];
      this.eduSelected = true;
    }else {
      this.selectedEducation = {id: null, name: "", start: "", end: "", comment: ""};
      this.eduSelected = false;
    }


    if(this.model.workPlaceList.length > 0){
      this.selectedWorkplace = this.model.workPlaceList[0];
      this.workSelected = true;
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

  createPDF(){

    let pdf = new jsPDF();

    var pageNumber = 1;
    pdf.setFontSize(10);
    pdf.text(pageNumber+"",95, 290);

    this.lineHeight = 40;

    var image = 'data:image/jpeg;base64,' + this.model.imageBase64;


    pdf.addImage(image, 'JPEG', 20, this.lineHeight);

    this.lineHeight +=65;

    /*Personal Details*/
    pdf.setFontSize(14);
    pdf.text(this.model.fullName, 20,this.lineHeight+6);
    this.lineHeight += 6;
    console.log(this.lineHeight);
    pdf.text(this.model.birthYear.toString(), 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.email, 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.phone, 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.title, 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.cvAddress, 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.city, 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.zipCode, 20,this.lineHeight+6);
    this.lineHeight += 6;
    pdf.text(this.model.cvCountry, 20,this.lineHeight+6);
    this.lineHeight += 6;

    this.lineHeight += 20;
    pdf.setFontSize(24);
    pdf.text("Professional Profile", 20, this.lineHeight);
    this.lineHeight +=2;
    pdf.line(20,this.lineHeight,190,this.lineHeight);

    var wordlist = "Tellus non volutpat nullam dolor pulvinar porta dapibus hymenaeos consequat habitasse, nisl sagittis, pulvinar aenean scelerisque vehicula metus, natoque odio luctus pulvinar ligula ut maecenas semper nunc aliquam penatibus. Convallis proin praesent mollis facilisis dis mattis justo nostra. Habitant semper. Posuere eget tellus per dis eros porttitor vel ultrices nibh duis vulputate, euismod cras mattis scelerisque iaculis suspendisse a est morbi, id primis sociis hendrerit sociis tempor donec, inceptos. Nisi a praesent tempor nisi libero molestie cum nisl nibh vel Feugiat. Ipsum natoque eros bibendum tincidunt donec elit interdum imperdiet. In tellus. Libero sollicitudin venenatis orci sed tellus sed congue arcu aliquet. Nunc luctus Pellentesque, fusce convallis vehicula vitae. Torquent phasellus aliquam turpis platea primis ultrices justo leo phasellus et nascetur. Adipiscing adipiscing conubia potenti rutrum primis duis scelerisque scelerisque leo consequat eu nisl fames quam vel congue sollicitudin pretium nonummy interdum imperdiet eleifend volutpat, lacus fames. Metus tortor quisque posuere semper auctor vulputate eleifend cubilia malesuada. Cras eu. Adipiscing habitant Interdum.Dictum quisque leo consequat, cum scelerisque. Id, vehicula penatibus. Quis tempor praesent maecenas tellus sem massa scelerisque nulla donec fringilla rutrum hendrerit imperdiet natoque imperdiet, urna. Odio dis hendrerit laoreet condimentum integer. Habitant leo magna donec. Nam mattis suscipit magna faucibus urna morbi vestibulum fermentum lacus ligula aenean primis egestas nisi. Amet nascetur magnis turpis phasellus hymenaeos quam phasellus ultrices class gravida curae; duis habitasse laoreet hac donec adipiscing mus pretium curae; porttitor habitant. Viverra placerat etiam purus luctus, justo, auctor iaculis eleifend fringilla ultricies fringilla nascetur elementum nostra dolor consequat conubia hendrerit ipsum rutrum volutpat lectus viverra nunc augue fames luctus porttitor ultrices Natoque fusce. Interdum habitasse vel bibendum maecenas morbi. Augue adipiscing. Eu sociosqu, congue luctus dictum dictum. Nisl tortor cursus habitant imperdiet aptent eget posuere pharetra placerat enim aptent.Nunc a tincidunt mauris orci blandit vel Gravida molestie enim Curabitur phasellus nostra aliquet dui aptent pretium vulputate. Vestibulum. Lacus malesuada. Commodo vestibulum purus dis taciti eleifend mus fermentum interdum. Eros leo proin imperdiet nisl blandit egestas ante. Ullamcorper blandit pellentesque nec. Platea. Class libero imperdiet diam ultricies sollicitudin semper nibh conubia. Litora, auctor. Ridiculus sagittis eros erat vel justo commodo. Id aenean, per blandit Magnis. Tortor aenean conubia mi eleifend cubilia netus inceptos mollis amet dui convallis, bibendum egestas ac litora. Urna duis venenatis a pharetra turpis. Fermentum natoque rhoncus, potenti nam aenean. Nisi felis laoreet adipiscing cubilia potenti maecenas pulvinar facilisis litora natoque dictum morbi. Pharetra elit sagittis eros per lobortis leo libero rutrum leo praesent nullam suspendisse volutpat nascetur sed, hac aliquet Tellus pede sollicitudin nec, habitasse. Sed justo in quis sagittis sagittis cursus turpis eleifend pulvinar nonummy. Litora mauris. Donec, lacus. Montes potenti leo volutpat. Justo. Nunc velit inceptos nulla sagittis cras pellentesque, bibendum enim. Potenti rhoncus. Etiam urna mollis primis lobortis neque laoreet sociosqu turpis felis ad metus auctor curabitur habitasse hymenaeos mauris. Nostra donec. Arcu accumsan erat potenti Dictumst mollis feugiat. Vehicula urna fringilla vehicula condimentum odio suspendisse aliquam, hendrerit feugiat eros gravida quisque curabitur. Suspendisse feugiat curae; ante blandit.";

    this.lineHeight += 4;
    pdf.setFontSize(10);

    var splitTitle = pdf.splitTextToSize(wordlist, 160);

    for(let row of splitTitle){
      this.lineHeight += 4;
      pdf.text(row +this.lineHeight, 20, this.lineHeight);
      if(this.lineHeight > 270){
        pdf.addPage();
        pdf.setFontSize(10);
        pageNumber++;
        pdf.text(pageNumber+"",95, 290);
        this.lineHeight = 22;
      }
    }

    this.lineHeight += 20;
    if(this.lineHeight > 200){
      pdf.addPage();
      pdf.setFontSize(10);
      pageNumber++;
      pdf.text(pageNumber+"",95, 290);
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
        pdf.text("0-3 Years", 80, this.lineHeight)
      }else if(skill.exp2){
        pdf.text("3-5 Years", 80, this.lineHeight)
      }else if(skill.exp3){
        pdf.text("5+ Years", 80, this.lineHeight)
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
      pdf.text(pageNumber+"",95, 290);
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

      var educationComment = "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image";

      this.lineHeight += 2;
      pdf.setFontSize(10);

      var splitTitle = pdf.splitTextToSize(educationComment, 160);

      for(let row of splitTitle){
        this.lineHeight += 4;
        pdf.text(row, 20, this.lineHeight);
        if(this.lineHeight > 270){
          pdf.addPage();
          pdf.setFontSize(10);
          pageNumber++;
          pdf.text(pageNumber+"",95, 290);
          this.lineHeight = 22;
        }
      }
    }

    this.lineHeight += 20;
    if(this.lineHeight > 200){
      pdf.addPage();
      pdf.setFontSize(10);
      pageNumber++;
      pdf.text(pageNumber+"",95, 290);
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

      var workPlaceComment = "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image";

      this.lineHeight += 2;
      pdf.setFontSize(10);

      var splitWorkPlace = pdf.splitTextToSize(workPlaceComment, 160);

      for(let row of splitWorkPlace){
        this.lineHeight += 4;
        pdf.text(row, 20, this.lineHeight);
        if(this.lineHeight > 270){
          pdf.addPage();
          pdf.setFontSize(10);
          pageNumber++;
          pdf.text(pageNumber+"",95, 290);
          this.lineHeight = 22;
        }
      }
    }

    pdf.save("CV");
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



  yesValidation(){
    console.log("delete Cv");
  }

}
