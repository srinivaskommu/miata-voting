import {combineReducers, Reducer} from "redux";
import {Election, Question} from "../models/elections";
import {
    ElectionsActions, isAddQuestionRequestAction,
    isCloseElectionRequestAction,
    isRefreshElectionsDoneAction
} from "../actions/electionsAction";

const electionsReducer: Reducer<Election[], ElectionsActions> = (elections = [], action) => {
    if (isRefreshElectionsDoneAction(action)) {
        return action.payload.elections;
    } else {
        return elections;

    }
};

const questionReducer: Reducer<Question[], ElectionsActions> = (questions = [], action) => {
    let newQuestions = questions;
    if (isAddQuestionRequestAction(action)) {
        newQuestions = [...newQuestions, action.payload.question]
    }

    if (isCloseElectionRequestAction(action)) {
        return [];
    }
    return newQuestions;
};

export const electionReducer = combineReducers({
    elections: electionsReducer,
    questions: questionReducer
});