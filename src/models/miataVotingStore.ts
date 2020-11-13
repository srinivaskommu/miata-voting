import {Answer,  Election} from "./elections";
import { Voter } from "./voters";

export type BallotToolState = {
    elections: Election[],
    electionId: number,
    voterId: number,
    ballotId: number,
    answers: Answer[],
}

export type VoterToolState = {
    voters: Voter[];
    editVoterId: number;
    isRegister:string;
    idsToBeDeleted: number[];
  };

export type MiataVotingState = {
    ballots: BallotToolState,
    votersState: VoterToolState
}