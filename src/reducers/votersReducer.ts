import { Reducer, combineReducers } from "redux";

import { VotersSort } from "../models/votersStore";
import { Voter } from "../models/voters";
import {
  isRefreshVotersDoneAction, VoterActions,
} from "../actions/votersActions";

export const votersReducer: Reducer<Voter[], VoterActions> = (voters = [], action) => {
  if (isRefreshVotersDoneAction(action)) {
    return action.payload.voters;
  }

  return voters;
};



export const voterToolReducer = combineReducers({
  voters: votersReducer,
});