import React from "react";
import { VoterFormContainer } from "../containers/VoterFormContainer";
import { VoterTableContainer } from "../containers/VoterTableContainer";

export function VoterRegistration() {

    return (
        <>
        <header>
            <h1>Voter Registration</h1>
        </header>
        <VoterTableContainer></VoterTableContainer>
        <VoterFormContainer></VoterFormContainer>
        </>
    );
}