import {combineReducers, Reducer} from "redux";
import {Answer, Election} from "../models/elections";
import {
    BallotsActions, isChangeAnswerAction,
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

const answersReducer: Reducer<Answer[], BallotsActions> = (answers= [], action) => {
    console.log(action);
    if(isChangeAnswerAction(action)) {
        console.log(answers);
        const newAnswers = [...action.payload.answers];
        const index = newAnswers.findIndex((answer) => answer.id === action.payload.questionId);
        const newAnswer = {...newAnswers[index]} ;
        newAnswer.answer = action.payload.value;
        newAnswers[index] = newAnswer;
        return newAnswers;
    } else {
        return answers;
    }
};

export const ballotsReducer = combineReducers({
    elections: electionsReducer,
    electionId: electionReducer,
    voterId: voterReducer,
    answers: answersReducer
});