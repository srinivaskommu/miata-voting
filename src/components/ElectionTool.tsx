import React, {ChangeEvent, useState} from "react";
import {Election} from "../models/elections";
import {ElectionTableContainer} from "../containers/ElectionTableContainer";
import {ElectionFormContainer} from "../containers/ElectionFormContainer";

export type ElectionToolProp = {
    elections: Election[];
    onRefreshTable: () => void;
}

export function ElectionTool(props: ElectionToolProp) {
    return (
        <header>
            <h1>
                Available Election Results
            </h1>
            <ElectionTableContainer/>
            <ElectionFormContainer/>
        </header>
    );
}