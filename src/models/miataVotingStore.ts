import {Ballot, Election, Voter} from "./elections";

export type BallotToolState = {
    elections: Election[],
    electionId: number,
    voterId: number,
    ballotId: number,
}

export type MiataVotingState = {
    ballots: BallotToolState,
}