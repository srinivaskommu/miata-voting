import {Item} from "./item";

export type Question = {
    id: number,
    title: string
};

export type Answer = {
    id: number,
    title: string,
    answer: boolean,
}

export type NewElection = {
    name: string,
    questions: Question[]
};

export type Election = NewElection & Item;
export type Ballot = {
    id: number,
    voterId: number,
    electionId: number,
    answers: Answer[],
};