import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
  replaceVoter,
  removeVoter,
  createEditVoterAction,
  createCancelVoterAction,
  refreshVoters,
} from "../actions/votersActions";
import { VoterTable } from "../components/VoterTable";
import {MiataVotingState} from "../models/miataVotingStore";

export function VoterTableContainer() {
  const stateProps = useSelector((state: MiataVotingState) => {
    console.log(state);
    return {
      voters: state.votersState.voters,
      editVoterId: state.votersState.editVoterId
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
        },
        dispatch
      ),
    [dispatch]
  );

  return <VoterTable {...stateProps}  {...boundActionProps} />;

}