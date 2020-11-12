import {combineReducers} from "redux";
import {ballotsReducer} from "./ballotsReducer";

export const miataVotingReducer = combineReducers({
    ballots: ballotsReducer,
});