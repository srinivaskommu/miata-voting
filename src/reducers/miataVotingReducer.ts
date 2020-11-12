import {combineReducers} from "redux";
import {ballotsReducer} from "./ballotsReducer";
import {votersReducer} from "./votersReducer";

export const miataVotingReducer = combineReducers({
    ballots: ballotsReducer,
    voters:votersReducer
});