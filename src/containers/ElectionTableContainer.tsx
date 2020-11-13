import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {ElectionResultTable} from "../components/ElectionResultTable";
import {MiataVotingState} from "../models/miataVotingStore";
import {refreshElections} from "../actions/electionsAction";

export function ElectionTableContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {
        return {...state.elections};
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onRefreshTable: refreshElections,
        },
        dispatch
    ), [dispatch]);

    useEffect(() => {
        refreshElections()(dispatch);
    }, [dispatch]);
    return <ElectionResultTable {...stateProps} {...boundActionProps}/>
}