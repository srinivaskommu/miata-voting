import { Action, AnyAction, Dispatch } from "redux";

import { Voter, NewVoter } from "../models/voters";

export const REFRESH_VOTERS_REQUEST_ACTION = "REFRESH_VOTERS_REQUEST";
export const REFRESH_VOTERS_DONE_ACTION = "REFRESH_VOTERS_DONE";
export const APPEND_VOTER_REQUEST_ACTION = "APPEND_VOTER_REQUEST";
export const REPLACE_VOTER_REQUEST_ACTION = "REPLACE_VOTER_REQUEST";
export const REMOVE_VOTER_REQUEST_ACTION = "REMOVE_VOTER_REQUEST";
export const EDIT_VOTER_ACTION = "EDIT_VOTER";
export const CANCEL_VOTER_ACTION = "CANCEL_VOTER";
export const SELECT_REGISTER_ACTION = 'SELECT_REGISTER_ACTION';
export const SORT_VOTERS_ACTION = "SORT_VOTERS_ACTION";
export const DELETE_SELECTED_REQUEST_ACTION = "DELETE_SELECTED_REQUEST_ACTION";
export const DELETE_SELECTED_REQUEST_DONE_ACTION = "DELETE_SELECTED_REQUEST_DONE_ACTION";


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
    voters: Voter[];
  };
}

export function isRefreshVotersDoneAction(
  action: AnyAction
): action is RefreshVotersDoneAction {
  return action.type === REFRESH_VOTERS_DONE_ACTION;
}

export type CreateRefreshVotersDoneAction = (
  voters: Voter[]
) => RefreshVotersDoneAction;

export const createRefreshVotersDoneAction: CreateRefreshVotersDoneAction = (
  voters
) => {
  return {
    type: REFRESH_VOTERS_DONE_ACTION,
    payload: {
      voters,
    },
  };
};

export const refreshVoters = () => {
  return (dispatch: Dispatch) => {
    dispatch(createRefreshVotersRequestAction());
    return fetch("http://localhost:3060/voters")
      .then((res) => res.json())
      .then((voters) => dispatch(createRefreshVotersDoneAction(voters)));
  };
};

export interface AppendVoterRequestAction
  extends Action<typeof APPEND_VOTER_REQUEST_ACTION> {
  payload: {
    voter: NewVoter;
  };
}

export function isAppendVoterRequestAction(
  action: AnyAction
): action is AppendVoterRequestAction {
  return action.type === APPEND_VOTER_REQUEST_ACTION;
}

export type CreateAppendVoterRequestAction = (
  voter: NewVoter
) => AppendVoterRequestAction;

export const createAppendVoterRequestAction: CreateAppendVoterRequestAction = (
  voter: NewVoter
) => {
  return {
    type: APPEND_VOTER_REQUEST_ACTION,
    payload: {
      voter,
    },
  };
};

export const appendVoter = (voter: NewVoter) => {
  return (dispatch: Dispatch) => {
    dispatch(createAppendVoterRequestAction(voter));
    return fetch("http://localhost:3060/voters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voter),
    }).then(() => {
      // refreshVoters()(dispatch);
      dispatch(createSelectElectionAction("HOME"));
    });
  };
};

export interface ReplaceVoterRequestAction
  extends Action<typeof REPLACE_VOTER_REQUEST_ACTION> {
  payload: {
    voter: Voter;
  };
}

export function isReplaceVoterRequestAction(
  action: AnyAction
): action is ReplaceVoterRequestAction {
  return action.type === REPLACE_VOTER_REQUEST_ACTION;
}

export type CreateReplaceVoterRequestAction = (
  voter: Voter
) => ReplaceVoterRequestAction;

export const createReplaceVoterRequestAction: CreateReplaceVoterRequestAction = (
  voter
) => {
  return {
    type: REPLACE_VOTER_REQUEST_ACTION,
    payload: {
      voter,
    },
  };
};

export const replaceVoter = (voter: Voter) => {
  return (dispatch: Dispatch) => {
    dispatch(createReplaceVoterRequestAction(voter));
    return fetch("http://localhost:3060/voters/" + encodeURIComponent(voter.id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voter),
    }).then(() => {
      refreshVoters()(dispatch);
    });
  };
};

export interface RemoveVoterRequestAction
  extends Action<typeof REMOVE_VOTER_REQUEST_ACTION> {
  payload: {
    voterId: number;
  };
}

export function isRemoveVoterRequestAction(
  action: AnyAction
): action is RemoveVoterRequestAction {
  return action.type === REMOVE_VOTER_REQUEST_ACTION;
}

export type CreateRemoveVoterRequestAction = (
  voterId: number
) => RemoveVoterRequestAction;

export const createRemoveVoterRequestAction: CreateRemoveVoterRequestAction = (
  voterId
) => {
  return {
    type: REMOVE_VOTER_REQUEST_ACTION,
    payload: {
      voterId,
    },
  };
};

export const removeVoter = (voterId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(createRemoveVoterRequestAction(voterId));
    return fetch("http://localhost:3060/voters/" + encodeURIComponent(voterId), {
      method: "DELETE",
    }).then(() => {
      refreshVoters()(dispatch);
    });
  };
};

export interface EditVoterAction extends Action<typeof EDIT_VOTER_ACTION> {
  payload: {
    voterId: number;
  };
}

export function isEditVoterAction(action: AnyAction): action is EditVoterAction {
  return action.type === EDIT_VOTER_ACTION;
}

export type CreateEditVoterAction = (voterId: number) => EditVoterAction;

export const createEditVoterAction: CreateEditVoterAction = (voterId: number) => {
  return {
    type: EDIT_VOTER_ACTION,
    payload: {
      voterId,
    },
  };
};

export type CancelVoterAction = Action<typeof CANCEL_VOTER_ACTION>;

export function isCancelVoterAction(
  action: AnyAction
): action is CancelVoterAction {
  return action.type === CANCEL_VOTER_ACTION;
}

export type CreateCancelVoterAction = () => CancelVoterAction;

export const createCancelVoterAction: CreateCancelVoterAction = () => {
  return {
    type: CANCEL_VOTER_ACTION,
  };
};

export interface SelectRegisterAction extends Action<typeof SELECT_REGISTER_ACTION> {
  payload: {
      isRegister: string,
  },
}

export function isSelectElectionAction(action: AnyAction): action is SelectRegisterAction {
  return action.type === SELECT_REGISTER_ACTION;
}

export type CreateSelectElectionAction = (isRegister: string) => SelectRegisterAction;

export const createSelectElectionAction: CreateSelectElectionAction = (isRegister) => {
  return {
      type: SELECT_REGISTER_ACTION,
      payload: {
        isRegister:isRegister,
      },
  };
};

export interface SortVotersAction extends Action<typeof SORT_VOTERS_ACTION> {
  payload: {
    sortCol: keyof Voter;
  };
}

export function isSortVotersAction(action: AnyAction): action is SortVotersAction {
  return action.type === SORT_VOTERS_ACTION;
}

export type CreateSortVotersAction = (sortCol: keyof Voter) => SortVotersAction;

export const createSortVotersAction: CreateSortVotersAction = (
  sortCol: keyof Voter
) => {
  return {
    type: SORT_VOTERS_ACTION,
    payload: {
      sortCol,
    },
  };
};


export interface DeleteSelectedVoterRequestAction
  extends Action<typeof DELETE_SELECTED_REQUEST_ACTION> {
  payload: {
    idsToBeDeleted: number[];
  };
}

export function isDeleteSelectedVoterRequestAction(
  action: AnyAction
): action is DeleteSelectedVoterRequestAction {
  return action.type === DELETE_SELECTED_REQUEST_ACTION;
}

export type CreateDeleteSelectedVoterRequestAction = (
  idsToBeDeleted: number[]
) => DeleteSelectedVoterRequestAction;

export const createDeleteSelectedVoterRequestAction: CreateDeleteSelectedVoterRequestAction = (
  idsToBeDeleted
) => {
  return {
    type: DELETE_SELECTED_REQUEST_ACTION,
    payload: {
      idsToBeDeleted,
    },
  };
};

export const deleteSelectedVoters = (idsToBeDeleted: number[]) => {
  return (dispatch: Dispatch) => {
    dispatch(createDeleteSelectedVoterRequestAction(idsToBeDeleted));
    return Promise.all(
      idsToBeDeleted.map((id: number) => {
        return fetch("http://localhost:3060/voters/" + encodeURIComponent(id), {
          method: "DELETE",
        });
      })
    ).then(() => {
      dispatch(createDeleteSelectedVoterRequestAction([]));
    })
    .then(() => {
      refreshVoters()(dispatch);
    });
  
  };
};



export type VoterActions =
  | RefreshVotersRequestAction
  | RefreshVotersDoneAction
  | AppendVoterRequestAction
  | ReplaceVoterRequestAction
  | RemoveVoterRequestAction
  | EditVoterAction
  | CancelVoterAction
  | SelectRegisterAction
  | DeleteSelectedVoterRequestAction
  |SortVotersAction;