import React, {useEffect} from "react";
import {Election} from "../models/elections";

export type BallotsListProps = {
    elections: Election[],
    onRefreshElections: () => void;
    onElectionSelected: (electionId: number) => void;
}

export function BallotsList(props: BallotsListProps) {

    useEffect(() => {
        props.onRefreshElections();
    }, [props.onRefreshElections]);

    const electionsList = props.elections.map(election => {
        return (<li key={election.id}>{election.name}<span><button onClick={() => props.onElectionSelected(election.id)}>Vote</button></span></li>);
    });
    return (
        <ul>
            {electionsList}
        </ul>

    )
}