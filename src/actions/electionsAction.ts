import {Action, AnyAction, Dispatch} from "redux";
import {Election, NewElection} from "../models/elections";

export const REFRESH_ELECTIONS_REQUEST_ACTION = 'REFRESH_ELECTIONS_REQUEST_ACTION';
export const REFRESH_ELECTIONS_DONE_ACTION = 'REFRESH_ELECTIONS_DONE_ACTION';
export const APPEND_ELECTION_REQUEST_ACTION = 'APPEND_ELECTION_REQUEST_ACTION';
export const CLOSE_ELECTION_REQUEST_ACTION = 'CLOSE_ELECTION_REQUEST_ACTION';
export const CREATE_ELECTION_REQUEST_ACTION = 'CREATE_ELECTION_REQUEST_ACTION';

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

export interface AppendElectionRequestAction
    extends Action<typeof APPEND_ELECTION_REQUEST_ACTION> {
    payload: {
        election: NewElection;
    };
}
export function isAppendElectionRequestAction(
    action: AnyAction
): action is AppendElectionRequestAction {
    return action.type === APPEND_ELECTION_REQUEST_ACTION;
}

export type CreateAppendElectionRequestAction = (
    car: NewElection
) => AppendElectionRequestAction;

export const createAppendElectionRequestAction: CreateAppendElectionRequestAction = (
    election: NewElection
) => {
    return {
        type: APPEND_ELECTION_REQUEST_ACTION,
        payload: {
            election,
        },
    };
};

export const appendElection = (election: NewElection) => {
    return (dispatch: Dispatch) => {
        dispatch(createAppendElectionRequestAction(election));
        return fetch("http://localhost:3060/elections", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(election),
        }).then(() => {
            refreshElections()(dispatch);
        });
    };
};

export interface CloseElectionRequestAction
    extends Action<typeof CLOSE_ELECTION_REQUEST_ACTION> {
}
export function isCloseElectionRequestAction(
    action: AnyAction
): action is CloseElectionRequestAction {
    return action.type === CLOSE_ELECTION_REQUEST_ACTION;
}

export type CreateCloseElectionRequestAction = (
) => CloseElectionRequestAction;

export const createCloseElectionRequestAction: CreateCloseElectionRequestAction = (
) => {
    return {
        type: CLOSE_ELECTION_REQUEST_ACTION,
    };
};

export interface CreateElectionRequestAction
    extends Action<typeof CREATE_ELECTION_REQUEST_ACTION> {
    payload: {
        numQuestions: number;
    }
}
export function isCreateElectionRequestAction(
    action: AnyAction
): action is CreateElectionRequestAction {
    return action.type === CREATE_ELECTION_REQUEST_ACTION;
}

export type CreateCreateElectionRequestAction = (numQuestions: number
) => CreateElectionRequestAction;

export const createCreateElectionRequestAction: CreateCreateElectionRequestAction = (numQuestions: number
) => {
    return {
        type: CREATE_ELECTION_REQUEST_ACTION,
        payload: {
            numQuestions: numQuestions
        }
    };
};

export type ElectionsActions = RefreshElectionsRequestAction
    | RefreshElectionsDoneAction | AppendElectionRequestAction | CloseElectionRequestAction | CreateElectionRequestAction;