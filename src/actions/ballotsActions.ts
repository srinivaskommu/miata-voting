import {Action, AnyAction, Dispatch} from "redux";
import {Answer, Ballot, Election} from "../models/elections";
import {Voter} from "../models/voters";

export const REFRESH_ELECTIONS_REQUEST_ACTION = 'REFRESH_ELECTIONS_REQUEST_ACTION';
export const REFRESH_ELECTIONS_DONE_ACTION = 'REFRESH_ELECTIONS_DONE_ACTION';
export const SELECT_ELECTION_ACTION = 'SELECT_ELECTION_ACTION';
export const CHANGE_ANSWER_ACTION = 'CHANGE_ANSWER_ACTION';
export const FETCH_BALLOT_REQUEST_ACTION = 'FETCH_BALLOT_REQUEST_ACTION';
export const FETCH_BALLOT_DONE_ACTION = 'FETCH_BALLOT_DONE_ACTION';
export const SUBMIT_BALLOT_REQUEST_ACTION = 'SUBMIT_BALLOT_REQUEST_ACTION';
export const SUBMIT_BALLOT_DONE_ACTION = 'SUBMIT_BALLOT_DONE_ACTION';

export interface SubmitBallotRequestAction extends Action<typeof SUBMIT_BALLOT_REQUEST_ACTION> {
    payload: {
        voterId: number,
        electionId: number,
        answers: Answer[],
    },
}

export function isSubmitBallotRequestAction(action: AnyAction): action is SubmitBallotRequestAction {
    return action.type === SUBMIT_BALLOT_REQUEST_ACTION;
}

export type CreateSubmitBallotRequestAction = (voterId: number, electionId: number, answers: Answer[]) => SubmitBallotRequestAction;

export const createSubmitBallotRequestAction: CreateSubmitBallotRequestAction = (voterId, electionId, answers) => {
    return {
        type: SUBMIT_BALLOT_REQUEST_ACTION,
        payload: {
            voterId: voterId,
            electionId: electionId,
            answers: answers
        },
    };
};

export interface SubmitBallotDoneAction extends Action<typeof SUBMIT_BALLOT_DONE_ACTION> {
    payload: {
        ballot: Ballot
    },
}

export function isSubmitBallotDoneAction(action: AnyAction): action is SubmitBallotDoneAction {
    return action.type === SUBMIT_BALLOT_DONE_ACTION;
}

export type CreateSubmitBallotDoneAction = (ballot: Ballot) => SubmitBallotDoneAction;

export const createSubmitBallotDoneAction: CreateSubmitBallotDoneAction = (ballot) => {
    return {
        type: SUBMIT_BALLOT_DONE_ACTION,
        payload: {
            ballot
        },
    };
};

async function createBallot(voterId: number, electionId: number, answers: Answer[]) {
    const res = await fetch("http://localhost:3060/ballots", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({voterId, electionId, answers}),
    });
    return await res.json();
}


export const submitBallot = (voterId: number, electionId: number, answers: Answer[]) => {
    return async (dispatch: Dispatch) => {
        dispatch(createSubmitBallotRequestAction(voterId, electionId, answers));
        const ballot = await createBallot(voterId, electionId, answers);

        dispatch(createSubmitBallotDoneAction(ballot));
    };
}

export interface ChangeAnswerAction extends Action<typeof CHANGE_ANSWER_ACTION> {
    payload: {
        answers: Answer[],
        questionId: number,
        value: boolean
    },
}

export function isChangeAnswerAction(action: AnyAction): action is ChangeAnswerAction {
    return action.type === CHANGE_ANSWER_ACTION;
}

export type CreateChangeAnswerAction = (answers: Answer[], questionId: number, value: boolean) => ChangeAnswerAction;

export const createChangeAnswerAction: CreateChangeAnswerAction = (answers, questionId, value) => {
    return {
        type: CHANGE_ANSWER_ACTION,
        payload: {
            answers: answers,
            questionId: questionId,
            value: value,
        },
    };
};

export type RefreshElectionsRequestAction = Action<typeof REFRESH_ELECTIONS_REQUEST_ACTION>;

export function isRefreshElectionsRequestAction(
    action: AnyAction
): action is RefreshElectionsRequestAction {
    return action.type === REFRESH_ELECTIONS_REQUEST_ACTION;
}

export type CreateRefreshElectionsRequestAction = () => RefreshElectionsRequestAction;

export const createRefreshElectionsRequestAction: CreateRefreshElectionsRequestAction = () => {
    return {
        type: REFRESH_ELECTIONS_REQUEST_ACTION,
    };
};

export interface RefreshElectionsDoneAction
    extends Action<typeof REFRESH_ELECTIONS_DONE_ACTION> {
    payload: {
        elections: Election[];
    };
}

export function isRefreshElectionsDoneAction(
    action: AnyAction
): action is RefreshElectionsDoneAction {
    return action.type === REFRESH_ELECTIONS_DONE_ACTION;
}

export type CreateRefreshElectionsDoneAction = (
    elections: Election[]
) => RefreshElectionsDoneAction;

export const createRefreshElectionsDoneAction: CreateRefreshElectionsDoneAction = (
    elections
) => {
    return {
        type: REFRESH_ELECTIONS_DONE_ACTION,
        payload: {
            elections,
        },
    };
};

export const refreshElections = () => {
    return (dispatch: Dispatch) => {
        dispatch(createRefreshElectionsRequestAction());
        return fetch("http://localhost:3060/elections")
            .then((res) => res.json())
            .then((elections) => dispatch(createRefreshElectionsDoneAction(elections)));
    };
}

export interface SelectElectionAction extends Action<typeof SELECT_ELECTION_ACTION> {
    payload: {
        electionId: number,
    },
}

export function isSelectElectionAction(action: AnyAction): action is SelectElectionAction {
    return action.type === SELECT_ELECTION_ACTION;
}

export type CreateSelectElectionAction = (electionId: number) => SelectElectionAction;

export const createSelectElectionAction: CreateSelectElectionAction = (electionId) => {
    return {
        type: SELECT_ELECTION_ACTION,
        payload: {
            electionId: electionId,
        },
    };
};

export interface FetchBallotRequestAction extends Action<typeof FETCH_BALLOT_REQUEST_ACTION> {
    payload: {
        email: string,
        electionId: number,
    },
}

export function isFetchBallotRequestAction(action: AnyAction): action is FetchBallotRequestAction {
    return action.type === FETCH_BALLOT_REQUEST_ACTION;
}

export type CreateFetchBallotRequestAction = (email: string, electionId: number) => FetchBallotRequestAction;

export const createFetchBallotRequestAction: CreateFetchBallotRequestAction = (email, electionId) => {
    return {
        type: FETCH_BALLOT_REQUEST_ACTION,
        payload: {
            email: email,
            electionId: electionId
        },
    };
};

export interface FetchBallotDoneAction extends Action<typeof FETCH_BALLOT_DONE_ACTION> {
    payload: {
        voterId: number,
        electionId: number,
    },
}

export function isFetchBallotDoneAction(action: AnyAction): action is FetchBallotDoneAction {
    return action.type === FETCH_BALLOT_DONE_ACTION;
}

export type CreateFetchBallotDoneAction = (voterId: number, electionId: number) => FetchBallotDoneAction;

export const createFetchBallotDoneAction: CreateFetchBallotDoneAction = (voterId, electionId) => {
    return {
        type: FETCH_BALLOT_DONE_ACTION,
        payload: {
            voterId: voterId,
            electionId: electionId
        },
    };
};

function getVoterIdByEmail(voters: Voter[], email: string) {
    const voter = voters.find((voter) => voter.email === email)
    if (voter) {
        return voter.id;
    } else {
        return -1;
    }
}

async function ballotAlreadyCast(voterId: number, electionId: number) {
    const res = await fetch("http://localhost:3060/ballots?voterId=" + voterId + "&electionId=" + electionId);
    const body = await res.json();
    console.log(body.length);
    return body.length > 0;
}

export const fetchBallot = (email: string, electionId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(createFetchBallotRequestAction(email, electionId));
        fetch("http://localhost:3060/voters")
            .then((res) => res.json())
            .then(async (voters) => {
                let voterId = getVoterIdByEmail(voters, email);
                if (await ballotAlreadyCast(voterId, electionId)) {
                    voterId = -1;
                }
                dispatch(createFetchBallotDoneAction(voterId, electionId));
                return;
            });
    };
}

export type BallotsActions =
    | RefreshElectionsDoneAction
    | SelectElectionAction
    | FetchBallotDoneAction
    | ChangeAnswerAction;