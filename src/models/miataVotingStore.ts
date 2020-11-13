import {Ballot, Election} from "./elections";
import { Voter } from "./voters";

export type BallotToolState = {
    elections: Election[],
    election: Election,
    voter: Voter,
    ballot: Ballot,
}

export type VoterToolState = {
    voters: Voter[];
    editVoterId: number;
    isRegister:string;
  };

export type MiataVotingState = {
    ballots: BallotToolState,
    votersState: VoterToolState
}