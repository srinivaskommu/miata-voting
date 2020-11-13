import {combineReducers} from "redux";
import {ballotsReducer} from "./ballotsReducer";
import {voterToolReducer} from "./votersReducer";

export const miataVotingReducer = combineReducers({
    ballots: ballotsReducer,
    votersState:voterToolReducer
});