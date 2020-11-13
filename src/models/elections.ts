import {Item} from "./item";

export type Question = {
    id: number,
    title: string
};
​
export type NewElection = {
    name: string,
    questions: Question[]
};

export type Election = NewElection & Item;