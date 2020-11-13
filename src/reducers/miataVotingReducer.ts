import {combineReducers} from "redux";
import {electionReducer} from "./electionReducer";
import {ballotsReducer} from "./ballotsReducer";
import {voterToolReducer} from "./votersReducer";


export const miataVotingReducer = combineReducers({
    elections: electionReducer,
    ballots: ballotsReducer,
    votersState:voterToolReducer
});