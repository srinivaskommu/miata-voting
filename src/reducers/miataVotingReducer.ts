import {combineReducers} from "redux";
import {electionReducer} from "./electionReducer";

export const miataVotingReducer = combineReducers({
    elections: electionReducer
});