import { Item } from "./item";


export type NewVoter = {
  firstName: string;
  lastName: string;
  dob:string;
  email: string;
  phone: string;
  address: string;
  county:string;
};

export type Voter = NewVoter & Item;