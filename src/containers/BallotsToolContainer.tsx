import {useDispatch, useSelector} from "react-redux";
import {MiataVotingState} from "../models/miataVotingStore";
import {bindActionCreators} from "redux";
import React, {useMemo} from "react";
import {createSelectElectionAction, fetchBallot, refreshElections} from "../actions/ballotsActions";
import {BallotsTool} from "../components/BallotsTool";

export function BallotsToolContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {

        return {...state.ballots};
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onRefreshElections: refreshElections,
            onElectionSelected: createSelectElectionAction,
            onFetchBallot: fetchBallot,
        },
        dispatch
    ), [dispatch]);

    return <BallotsTool {...stateProps} {...boundActionProps} />
}