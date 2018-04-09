import {WorkPlace} from "./workPlace";
import {Skill} from "./skill";
import {Education} from "./education";

export interface FullCvView {

  id: number;
  fullName: string;
  birthYear: number;
  email: string;
  cvAddress: string;
  cvCountry: string;
  city: string;
  zipCode: string;
  phone: string;
  imageBase64: string;
  title: string;
  comment: string;
  posted: string;

  educationList:Education[];
  workPlaceList:WorkPlace[];
  fullSkillList:Skill[];


}
