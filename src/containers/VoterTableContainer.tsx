import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
  replaceVoter,
  removeVoter,
  createEditVoterAction,
  createCancelVoterAction,
  refreshVoters,
  deleteSelectedVoters
} from "../actions/votersActions";
import { VoterTable } from "../components/VoterTable";
import {MiataVotingState} from "../models/miataVotingStore";

export function VoterTableContainer() {
  const stateProps = useSelector((state: MiataVotingState) => {
    console.log(state);
    return {
      voters: state.votersState.voters,
      editVoterId: state.votersState.editVoterId,
      idsToBeDeleted:state.votersState.idsToBeDeleted
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
          onSelectedDeleteVoter:deleteSelectedVoters
        },
        dispatch
      ),
    [dispatch]
  );

  return <VoterTable {...stateProps}  {...boundActionProps} />;

}