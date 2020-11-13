import {Answer,  Election} from "./elections";
import { Voter } from "./voters";
import { VotersSort } from "./votersStore";

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
    votersSort: VotersSort;
  };

export type MiataVotingState = {
    ballots: BallotToolState,
    votersState: VoterToolState
}