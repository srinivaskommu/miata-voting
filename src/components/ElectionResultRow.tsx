import React from "react";
import {Election} from "../models/elections";

export type ElectionResultRowProps = {
    election: Election;
    onViewResults: (electionId: number) => void;
}
export function ElectionResultRow(props : ElectionResultRowProps) {
    return (
        <tr>
            <td className="col-body">{props.election.id}</td>
            <td className="col-body">{props.election.name}</td>
            <td>
                <button type="button" onClick={() => props.onViewResults(props.election.id)}>View Results</button>
            </td>
        </tr>
    );
}