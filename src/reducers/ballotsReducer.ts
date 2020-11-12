import {combineReducers, Reducer} from "redux";
import {Election} from "../models/elections";
import {
    BallotsActions,
    isFetchBallotDoneAction,
    isRefreshElectionsDoneAction,
    isSelectElectionAction
} from "../actions/ballotsActions";

const electionsReducer: Reducer<Election[], BallotsActions> = (elections = [], action) => {
    if (isRefreshElectionsDoneAction(action)) {
        return action.payload.elections;
    } else {
        return elections;

    }
};

const electionReducer: Reducer<number, BallotsActions> = (electionId = -1, action) => {
    if(isSelectElectionAction(action)) {
        return action.payload.electionId
    } else {
        return electionId;
    }
};

const voterReducer: Reducer<number, BallotsActions> = (voterId = -1, action) => {
    if(isFetchBallotDoneAction(action)) {
        return action.payload.voterId;
    } else {
        return voterId;
    }
};

export const ballotsReducer = combineReducers({
    elections: electionsReducer,
    electionId: electionReducer,
    voterId: voterReducer,
});