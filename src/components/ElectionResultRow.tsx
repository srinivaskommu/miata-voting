import React from "react";
import {Election} from "../models/elections";

export type ElectionResultRowProps = {
    election: Election;
}
export function ElectionResultRow(props : ElectionResultRowProps) {
    return (
        <tr>
            <td className="col-body">{props.election.id}</td>
            <td className="col-body">{props.election.name}</td>
            <td>
                <button type="button" onClick={() => null}>View Results</button>
            </td>
        </tr>
    );
}