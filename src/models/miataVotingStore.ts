import {Election} from "./elections";

export type ElectionToolState = {
    elections: Election[]
    numQuestions: number
}

export type MiataVotingState = {
    elections: ElectionToolState,
}