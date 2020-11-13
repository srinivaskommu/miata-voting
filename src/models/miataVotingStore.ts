import {Answer, Ballot, Election, Voter} from "./elections";

export type BallotToolState = {
    elections: Election[],
    electionId: number,
    voterId: number,
    ballotId: number,
    answers: Answer[],
}

export type MiataVotingState = {
    ballots: BallotToolState,
}