import { Action, AnyAction, Dispatch } from "redux";

import { Voter, NewVoter } from "../models/voters";

export const REFRESH_VOTERS_REQUEST_ACTION = "REFRESH_VOTERS_REQUEST";
export const REFRESH_VOTERS_DONE_ACTION = "REFRESH_VOTERS_DONE";

export type RefreshVotersRequestAction = Action<
  typeof REFRESH_VOTERS_REQUEST_ACTION
>;

export function isRefreshVotersRequestAction(
  action: AnyAction
): action is RefreshVotersRequestAction {
  return action.type === REFRESH_VOTERS_REQUEST_ACTION;
}

export type CreateRefreshVotersRequestAction = () => RefreshVotersRequestAction;

export const createRefreshVotersRequestAction: CreateRefreshVotersRequestAction = () => {
  return {
    type: REFRESH_VOTERS_REQUEST_ACTION,
  };
};

export interface RefreshVotersDoneAction
  extends Action<typeof REFRESH_VOTERS_DONE_ACTION> {
  payload: {
    cars: Voter[];
  };
}

export function isRefreshVotersDoneAction(
  action: AnyAction
): action is RefreshVotersDoneAction {
  return action.type === REFRESH_VOTERS_DONE_ACTION;
}

export type CreateRefreshVotersDoneAction = (
  cars: Voter[]
) => RefreshVotersDoneAction;

export const createRefreshVotersDoneAction: CreateRefreshVotersDoneAction = (
  cars
) => {
  return {
    type: REFRESH_VOTERS_DONE_ACTION,
    payload: {
      cars,
    },
  };
};

export const refreshVoters = () => {
  return (dispatch: Dispatch) => {
    dispatch(createRefreshVotersRequestAction());
    return fetch("http://localhost:3060/voters")
      .then((res) => res.json())
      .then((cars) => dispatch(createRefreshVotersDoneAction(cars)));
  };
};