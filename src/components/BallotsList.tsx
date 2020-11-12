import React, {useEffect} from "react";
import {Election} from "../models/elections";

export type BallotsListProps = {
    elections: Election[],
    onRefreshCars: () => void;
}

export function BallotsList(props: BallotsListProps) {

    useEffect(() => {
        props.onRefreshCars();
    }, [props.onRefreshCars]);

    const electionsList = props.elections.map(election => {
        return (<li key={election.id}>{election.name}</li>);
    });
    return (
        <ul>
            {electionsList}
        </ul>

    )
}