import {combineReducers, Reducer} from "redux";
import {Election} from "../models/elections";
import {BallotsActions, isRefreshElectionsDoneAction} from "../actions/ballotsActions";

const electionsReducer: Reducer<Election[], BallotsActions> = (elections = [], action) => {
    if (isRefreshElectionsDoneAction(action)) {
        return action.payload.elections;
    } else {
        return elections;

    }
};

const electionReducer: Reducer<Election[], BallotsActions> = (elections = [], action) => {
    return elections;
};

export const ballotsReducer = combineReducers({
    elections: electionsReducer,
    election: electionReducer,
});