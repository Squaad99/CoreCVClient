import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.css']
})

export class SelectCountryComponent implements OnInit {

  model: any = {};

  countrySelected: string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  sendMessage(){
    this.countrySelected = this.model.country;
    console.log(this.model.country);
    this.messageEvent.emit(this.countrySelected);
  }


}
