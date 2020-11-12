import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
  replaceVoter,
  removeVoter,
  createEditVoterAction,
  createCancelVoterAction,
  createSortVotersAction,
  refreshVoters,
} from "../actions/votersActions";
import { VoterTable } from "../components/VoterTable";
import {MiataVotingState} from "../models/miataVotingStore";

export function VoterTableContainer() {
  const stateProps = useSelector((state: MiataVotingState) => {
    return {
      unsortedVoters: state.voters,
      editVoterId: state.voters.editVoterId,
      votersSort: state.voters.votersSort,
    };
  });

  const { sortCol, sortDir } = stateProps.votersSort;
  const { unsortedVoters } = stateProps;

  const sortedVoters = useMemo(
    () =>
      [...unsortedVoters].sort((a, b) => {
        if (a[sortCol] < b[sortCol]) {
          return sortDir === "asc" ? -1 : 1;
        } else if (a[sortCol] > b[sortCol]) {
          return sortDir === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      }),
    [unsortedVoters, sortCol, sortDir]
  );

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
          onSortVoters: createSortVotersAction,
        },
        dispatch
      ),
    [dispatch]
  );

  // return <VoterTable {...stateProps} voters={sortedVoters} {...boundActionProps} />;

  return <VoterTable />;
}