import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {MiataVotingState} from "../models/miataVotingStore";
import {
    appendElection, createAddQuestionRequestAction,
    createCloseElectionRequestAction,
    refreshElections
} from "../actions/electionsAction";
import {ElectionForm} from "../components/ElectionForm";

export function ElectionFormContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {
        return {questions: state.elections.questions};
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onCreateElection: appendElection,
            onClose: createCloseElectionRequestAction,
            onAddQuestion: createAddQuestionRequestAction
        },
        dispatch
    ), [dispatch]);

    useEffect(() => {
        refreshElections()(dispatch);
    }, [dispatch]);
    return <ElectionForm {...stateProps} {...boundActionProps}/>
}