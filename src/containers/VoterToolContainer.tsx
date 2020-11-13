import {useDispatch, useSelector} from "react-redux";
import {MiataVotingState} from "../models/miataVotingStore";
import {bindActionCreators} from "redux";
import React, {useMemo} from "react";
import { createSelectElectionAction, refreshVoters } from "../actions/votersActions";
import { VoterTool } from "../components/VoterTool";

export function VoterToolContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {
        

        return {...state.votersState};
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onRefreshVoters: refreshVoters,
            onRegisterSelected: createSelectElectionAction
        },
        dispatch
    ), [dispatch]);

    return <VoterTool {...stateProps} {...boundActionProps} />
}