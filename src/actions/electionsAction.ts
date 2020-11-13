import {Action, AnyAction, Dispatch} from "redux";
import {Ballot, BallotAnswer, Election, NewElection, NewQuestion} from "../models/elections";
import {Voter} from "../models/voters";
import {FETCH_BALLOT_DONE_ACTION} from "./ballotsActions";

export const REFRESH_ELECTIONS_REQUEST_ACTION = 'REFRESH_ELECTIONS_REQUEST_ACTION';
export const REFRESH_ELECTIONS_DONE_ACTION = 'REFRESH_ELECTIONS_DONE_ACTION';
export const APPEND_ELECTION_REQUEST_ACTION = 'APPEND_ELECTION_REQUEST_ACTION';
export const CLOSE_ELECTION_REQUEST_ACTION = 'CLOSE_ELECTION_REQUEST_ACTION';
export const ADD_QUESTION_REQUEST_ACTION = 'CREATE_ELECTION_REQUEST_ACTION';
export const SHOW_RESULT_REQUEST_ACTION = 'SHOW_RESULT_REQUEST_ACTION';
export const FETCH_BALLOT_ANSWER_REQUEST_ACTION = 'FETCH_BALLOT_ANSWER_REQUEST_ACTION';
export const FETCH_BALLOT_ANSWER_DONE_REQUEST_ACTION = 'FETCH_BALLOT_ANSWER_DONE_REQUEST_ACTION';


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

export interface AddQuestionRequestAction
    extends Action<typeof ADD_QUESTION_REQUEST_ACTION> {
    payload: {
        question: NewQuestion;
    }
}
export function isAddQuestionRequestAction(
    action: AnyAction
): action is AddQuestionRequestAction {
    return action.type === ADD_QUESTION_REQUEST_ACTION;
}

export type CreateAddQuestionRequestAction = (question: NewQuestion
) => AddQuestionRequestAction;

export const createAddQuestionRequestAction: CreateAddQuestionRequestAction = (question: NewQuestion
) => {
    return {
        type: ADD_QUESTION_REQUEST_ACTION,
        payload: {
            question
        }
    };
};

export interface ShowResultRequestAction
    extends Action<typeof SHOW_RESULT_REQUEST_ACTION> {
    payload: {
        electionId: number;
    }
}
export function isShowResultRequestAction(
    action: AnyAction
): action is ShowResultRequestAction {
    return action.type === SHOW_RESULT_REQUEST_ACTION;
}

export type CreateShowResultRequestAction = (electionId: number
) => ShowResultRequestAction;

export const createShowResultRequestAction: CreateShowResultRequestAction = (electionId: number
) => {
    return {
        type: SHOW_RESULT_REQUEST_ACTION,
        payload: {
            electionId
        }
    };
};


export interface FetchBallotAnswerDoneAction extends Action<typeof FETCH_BALLOT_ANSWER_DONE_REQUEST_ACTION> {
    payload: {
        ballots: Ballot[]
    },
}

export function isFetchBallotAnswerDoneAction(action: AnyAction): action is FetchBallotAnswerDoneAction {
    return action.type === FETCH_BALLOT_ANSWER_DONE_REQUEST_ACTION;
}

export type CreateFetchBallotAnswerDoneAction = (ballots: Ballot[]) => FetchBallotAnswerDoneAction;

export const createFetchBallotAnswerDoneAction: CreateFetchBallotAnswerDoneAction = (ballots: Ballot[]) => {
    return {
        type: FETCH_BALLOT_ANSWER_DONE_REQUEST_ACTION,
        payload: {
            ballots
        },
    };
};

export interface FetchBallotAnswerRequestAction extends Action<typeof FETCH_BALLOT_ANSWER_REQUEST_ACTION> {
    payload: {
        electionId: number,
    },
}

export function isFetchBallotAnswerRequestAction(action: AnyAction): action is FetchBallotAnswerRequestAction {
    return action.type === FETCH_BALLOT_ANSWER_REQUEST_ACTION;
}

export type CreateFetchBallotAnswerRequestAction = (electionId: number) => FetchBallotAnswerRequestAction;

export const createFetchBallotAnswerRequestAction: CreateFetchBallotAnswerRequestAction = (electionId) => {
    return {
        type: FETCH_BALLOT_ANSWER_REQUEST_ACTION,
        payload: {
            electionId: electionId
        },
    };
};

function getBallotsOfElection(ballotAnswers: BallotAnswer[], electionId: number) {
    return ballotAnswers.filter((ballotAnswer) => ballotAnswer.electionId === electionId)
}


export const fetchBallotAnswers = (electionId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(createFetchBallotAnswerRequestAction(electionId));
        fetch("http://localhost:3060/ballots?electionId="+electionId)
            .then((res) => res.json())
            .then((ballots) => {
                // const ballotsAnswersOfElections = getBallotsOfElection(ballotAnswer, electionId);
                dispatch(createFetchBallotAnswerDoneAction(ballots));
                return;
            });
    };
}
export type ElectionsActions = RefreshElectionsRequestAction | ShowResultRequestAction | FetchBallotAnswerRequestAction | FetchBallotAnswerDoneAction
    | RefreshElectionsDoneAction | AppendElectionRequestAction | CloseElectionRequestAction | AddQuestionRequestAction;