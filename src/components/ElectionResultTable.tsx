import React from "react";
import "./ElectionTable.css";
import {Election} from "../models/elections";
import {ElectionResultRow} from "./ElectionResultRow";

export type ElectionResultTableProp = {
    elections: Election[];
}
export function ElectionResultTable(props: ElectionResultTableProp) {

    return (
        <table id="election-table">
            <thead>
            <th className="col-header">Id</th>
            <th className="col-header">Name</th>
            <th className="col-header">Action</th>
            </thead>
            <tbody>
            {
                props.elections.map((election) => <ElectionResultRow election={election}/>)
            }
            </tbody>
        </table>
    );
}