import {Answer, Ballot, Election, Question, ResultCount} from "./elections";
import { Voter } from "./voters";

export type BallotToolState = {
    elections: Election[],
    electionId: number,
    voterId: number,
    ballotId: number,
    answers: Answer[],
}

export type ElectionToolState = {
    elections: Election[],
    questions: Question[],
    results: Ballot[],
    resultCount: ResultCount[],
    electionId: number
}

export type VoterToolState = {
    voters: Voter[];
    editVoterId: number;
    isRegister:string;
};

export type MiataVotingState = {
    elections: ElectionToolState,
    ballots: BallotToolState,
    votersState: VoterToolState
}

