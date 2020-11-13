import { Reducer, combineReducers } from "redux";

import { Voter } from "../models/voters";
import {
  isAppendVoterRequestAction,
  isCancelVoterAction,
  isDeleteSelectedVoterRequestAction,
  isEditVoterAction,
  isRefreshVotersDoneAction, isSelectElectionAction, VoterActions,
} from "../actions/votersActions";

export const votersReducer: Reducer<Voter[], VoterActions> = (voters = [], action) => {

  if (isRefreshVotersDoneAction(action)) {
    console.log(action);
    return action.payload.voters;
  }

  return voters;
};

export const editVoterIdReducer: Reducer<number, VoterActions> = (
  editVoterId = -1,
  action
) => {
  if (isEditVoterAction(action)) {
    return action.payload.voterId;
  }

  if (isCancelVoterAction(action) || isRefreshVotersDoneAction(action)) {
    return -1;
  }

  return editVoterId;
};


export const registerSelectReducer: Reducer<string, VoterActions> = (
  isRegister = "",
  action
) => {
  if (isSelectElectionAction(action)) {
    return action.payload.isRegister;
  }

  return isRegister;
};

export const selectedDeleteReducer: Reducer<number[], VoterActions> = (voters = [], action) => {

  if (isDeleteSelectedVoterRequestAction(action)) {
    console.log(action);
    return action.payload.idsToBeDeleted;
  }

  return voters;
};



export const voterToolReducer = combineReducers({
  voters: votersReducer,
  editVoterId: editVoterIdReducer,
  isRegister:registerSelectReducer,
  idsToBeDeleted:selectedDeleteReducer
});