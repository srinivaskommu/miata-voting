import {Ballot, Election, Voter} from "./elections";

export type BallotToolState = {
    elections: Election[],
    election: Election,
    voter: Voter,
    ballot: Ballot,
}

export type MiataVotingState = {
    ballots: BallotToolState,
}