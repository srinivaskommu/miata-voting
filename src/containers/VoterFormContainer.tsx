import React, { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

import { appendVoter } from "../actions/votersActions";
import { VoterForm } from "../components/VoterForm";

export function VoterFormContainer() {
  const dispatch = useDispatch();

  const boundActionProps = useMemo(
    () =>
      bindActionCreators(
        {
          onSubmitVoter: appendVoter,
        },
        dispatch
      ),
    [dispatch]
  );

  return <VoterForm {...boundActionProps}/>;
}