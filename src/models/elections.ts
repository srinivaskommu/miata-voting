import {Item} from "./item";

export type NewQuestion = {
    title: string
};

export type Question = NewQuestion & Item;

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

export type BallotAnswer = Omit<Ballot, "voterId">;

export type ResultCount = {
    title: string,
    for : number,
    against: number
}