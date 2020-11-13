import {combineReducers, Reducer} from "redux";
import {Election} from "../models/elections";
import {
    ElectionsActions,
    isCloseElectionRequestAction, isCreateElectionRequestAction,
    isRefreshElectionsDoneAction
} from "../actions/electionsAction";

const electionsReducer: Reducer<Election[], ElectionsActions> = (elections = [], action) => {
    if (isRefreshElectionsDoneAction(action)) {
        return action.payload.elections;
    } else {
        return elections;

    }
};

const editNumQuestionReducer: Reducer<number, ElectionsActions> = (numQuestions = 0, action) => {
    if (isCloseElectionRequestAction(action)) {
        return 0;
    }

    if (isCreateElectionRequestAction(action)) {
        console.log("reducer: " + numQuestions);
        return action.payload.numQuestions;
    }
    return numQuestions;
};

export const electionReducer = combineReducers({
    elections: electionsReducer,
    numQuestions: editNumQuestionReducer
});