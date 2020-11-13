import React from "react";
import "./ElectionTable.css";
import {Ballot, Election, ResultCount} from "../models/elections";
import {ElectionResultRow} from "./ElectionResultRow";

export type ElectionResultTableProp = {
    elections: Election[];
    results: Ballot[];
    resultsCount: ResultCount[];
    onViewResults: (electionId: number) => void;
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
                props.elections.map((election) => <ElectionResultRow election={election} onViewResults={props.onViewResults}/>)
            }
            {
                props.resultsCount.map((resultCount) => <tr>Title: {resultCount.title}, For: {resultCount.for}, Against: {resultCount.against}</tr>)
            }
            </tbody>
        </table>
    );
}