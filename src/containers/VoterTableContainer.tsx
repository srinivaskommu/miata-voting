import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
  replaceVoter,
  removeVoter,
  createEditVoterAction,
  createCancelVoterAction,
  refreshVoters,
  deleteSelectedVoters,
  createSortVotersAction
} from "../actions/votersActions";
import { VoterTable } from "../components/VoterTable";
import {MiataVotingState} from "../models/miataVotingStore";

export function VoterTableContainer() {
  const stateProps = useSelector((state: MiataVotingState) => {
    
    const { sortCol, sortDir } = state.votersState.votersSort;

    const sortedVoters = [...state.votersState.voters].sort((a, b) => {
      if (a[sortCol] < b[sortCol]) {
        return sortDir === "asc" ? -1 : 1;
      } else if (a[sortCol] > b[sortCol]) {
        return sortDir === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });


    return {
      voters: sortedVoters,
      editVoterId: state.votersState.editVoterId,
      votersSort: state.votersState.votersSort,
    };
  });



  const dispatch = useDispatch();

  useEffect(() => {
    refreshVoters()(dispatch);
  }, [dispatch]);

  const boundActionProps = useMemo(
    () =>
      bindActionCreators(
        {
          onSaveVoter: replaceVoter,
          onDeleteVoter: removeVoter,
          onEditVoter: createEditVoterAction,
          onCancelVoter: createCancelVoterAction,
          onSelectedDeleteVoter:deleteSelectedVoters,
          onSortVoters:createSortVotersAction
        },
        dispatch
      ),
    [dispatch]
  );

  return <VoterTable {...stateProps}  {...boundActionProps} />;

}