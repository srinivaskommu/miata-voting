import {Answer, Election} from "./elections";
import { Voter } from "./voters";

export type BallotToolState = {
    elections: Election[],
    electionId: number,
    voterId: number,
    ballotId: number,
    answers: Answer[],
}

export type ElectionToolState = {
    elections: Election[]
    numQuestions: number
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

