import React from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
  createAppendVoterAction,
  createReplaceVoterAction,
  createRemoveVoterAction,
  createEditVoterAction,
  createCancelVoterAction,
  createSortVotersAction,
} from "../actions/voterRegistrationActions";
import { VoterTool } from "../components/VoterTool";
import { VoterToolState } from "../models/voterStore";

export function VoterToolContainer() {
  const stateProps = useSelector((state: VoterToolState) => {
    const { sortCol, sortDir } = state.votersSort;

    const sortedVoters = [...state.voters].sort((a, b) => {
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
      editVoterId: state.editVoterId,
      votersSort: state.votersSort,
    };
  });

  const boundActionProps = bindActionCreators(
    {
      onAddVoter: createAppendVoterAction,
      onSaveVoter: createReplaceVoterAction,
      onDeleteVoter: createRemoveVoterAction,
      onEditVoter: createEditVoterAction,
      onCancelVoter: createCancelVoterAction,
      onSortVoters: createSortVotersAction,
    },
    useDispatch()
  );

  return <VoterTool {...stateProps} {...boundActionProps} />;
}