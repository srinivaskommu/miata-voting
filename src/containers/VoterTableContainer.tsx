import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
  refreshVoters,
} from "../actions/voterRegistrationActions";
import { VoterTable } from "../components/VoterTable";
import { VoterToolState } from "../models/votersStore";

export function VoterTableContainer() {
  const stateProps = useSelector((state: VoterToolState) => {
    return {
      unsortedVoters: state.voters,
      editVoterId: state.editVoterId,
      votersSort: state.votersSort,
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

  return <VoterTable {...stateProps} voters={sortedVoters} {...boundActionProps} />;
}