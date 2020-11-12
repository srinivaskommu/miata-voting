import {useDispatch, useSelector} from "react-redux";
import {MiataVotingState} from "../models/miataVotingStore";
import {bindActionCreators} from "redux";
import React, {useMemo} from "react";
import {refreshElections} from "../actions/ballotsActions";
import { VoterRegistration } from "../components/VoterRegistration";

export function VotersContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {

        return {...state.voters};
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onRefreshCars: refreshElections,
        },
        dispatch
    ), [dispatch]);

    return <VoterRegistration {...stateProps} {...boundActionProps} />
}