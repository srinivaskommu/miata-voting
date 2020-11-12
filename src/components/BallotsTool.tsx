import React, {} from "react";
import {Election} from "../models/elections";
import {BallotsList} from "./BallotsList";
import {VoterIdentification} from "./VoterIdentification";

export type BallotsToolProps = {
    elections: Election[],
    electionId: number,
    onRefreshElections: () => void;
    onElectionSelected: (electionId: number) => void;
    onFetchBallot: (email: string, electionId: number) => void;
}

export function BallotsTool(props: BallotsToolProps) {

    function onCheckIdentity(email:string){
        props.onFetchBallot(email, props.electionId);
    }

    let widget = <div>"Looks like widget is missing"</div>;

    if (props.electionId < 0) {
        widget = <BallotsList elections={props.elections} onElectionSelected={props.onElectionSelected}
                              onRefreshElections={props.onRefreshElections}/>;
    } else {
        widget = <VoterIdentification onCheckIdentity={onCheckIdentity} />
    }

    return (widget)
}