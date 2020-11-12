import {Action, AnyAction, Dispatch} from "redux";
import {Election, Voter} from "../models/elections";

export const REFRESH_ELECTIONS_REQUEST_ACTION = 'REFRESH_ELECTIONS_REQUEST_ACTION';
export const REFRESH_ELECTIONS_DONE_ACTION = 'REFRESH_ELECTIONS_DONE_ACTION';
export const SELECT_ELECTION_ACTION = 'SELECT_ELECTION_ACTION';
export const FETCH_BALLOT_REQUEST_ACTION = 'FETCH_BALLOT_REQUEST_ACTION';
export const FETCH_BALLOT_DONE_ACTION = 'FETCH_BALLOT_DONE_ACTION';

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

export const fetchBallot = (email: string, electionId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(createFetchBallotRequestAction(email, electionId));
        fetch("http://localhost:3060/voters")
            .then((res) => res.json())
            .then((voters) => {
                const voterId = getVoterIdByEmail(voters, email);
                dispatch(createFetchBallotDoneAction(voterId, electionId));
                return;
            });
    };
}

export type BallotsActions =
    | RefreshElectionsDoneAction
    | SelectElectionAction
    | FetchBallotDoneAction;