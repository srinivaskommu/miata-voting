import {combineReducers, Reducer} from "redux";
import {Ballot, Election, Question} from "../models/elections";
import {
    ElectionsActions, isAddQuestionRequestAction,
    isCloseElectionRequestAction, isFetchBallotAnswerDoneAction,
    isRefreshElectionsDoneAction, isShowResultRequestAction
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
        const question = {...action.payload.question, id: questions.length}
        newQuestions = [...newQuestions, question]
    }

    if (isCloseElectionRequestAction(action)) {
        return [];
    }
    return newQuestions;
};

const resultsReducer: Reducer<Ballot[], ElectionsActions> = (ballots = [], action) => {



    // if (isShowResultRequestAction(action)) {
    //     const idx = elections.findIndex((election) => (election.id === action.payload.electionId));
    //     const questions =  stateProps.elections[idx].questions
    // }

    if (isFetchBallotAnswerDoneAction(action)) {
        console.log("resultReducer: ");
        console.log(action.payload.ballots);
        return action.payload.ballots;
    }
    return ballots;

};

export const electionReducer = combineReducers({
    elections: electionsReducer,
    questions: questionReducer,
    results: resultsReducer
});