import {useDispatch, useSelector} from "react-redux";
import {MiataVotingState} from "../models/miataVotingStore";
import {bindActionCreators} from "redux";
import React, {useMemo} from "react";
import {BallotsList} from "../components/BallotsList";
import {refreshElections} from "../actions/ballotsActions";

export function BallotsListContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {

        return {...state.ballots};
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onRefreshCars: refreshElections,
        },
        dispatch
    ), [dispatch]);

    return <BallotsList {...stateProps} {...boundActionProps} />
}