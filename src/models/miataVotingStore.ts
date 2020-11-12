import {Ballot, Election, Voter} from "./elections";
import { VotersSort } from "./votersStore";

export type BallotToolState = {
    elections: Election[],
    election: Election,
    voter: Voter,
    ballot: Ballot,
}

export type VoterToolState = {
    voters: Voter[];
    editVoterId: number;
    votersSort: VotersSort;
  };

export type MiataVotingState = {
    ballots: BallotToolState,
    voters: VoterToolState
}