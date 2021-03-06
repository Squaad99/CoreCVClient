import {Education} from "./education";
import {WorkPlace} from "./workPlace";
import {Skill} from "./skill";

export interface FullCV {

  id: number;
  firstName: string;
  lastName: string;
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

  educationList:Education[];
  workPlaceList:WorkPlace[];
  fullSkillList:Skill[];


}
