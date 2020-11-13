import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {MiataVotingState} from "../models/miataVotingStore";
import {
    appendElection,
    createCloseElectionRequestAction, createCreateElectionRequestAction,
    refreshElections
} from "../actions/electionsAction";
import {ElectionQuestionForm} from "../components/ElectionQuestionForm";

export function ElectionFormContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {
        return {numQuestions: state.elections.numQuestions};
    });

    console.log("election container: " + stateProps.numQuestions);
    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onAddElection: appendElection,
            onClose: createCloseElectionRequestAction,
            onCreateElection: createCreateElectionRequestAction
        },
        dispatch
    ), [dispatch]);

    useEffect(() => {
        refreshElections()(dispatch);
    }, [dispatch]);
    return <ElectionQuestionForm {...stateProps} {...boundActionProps}/>
}