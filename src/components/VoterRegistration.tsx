import React from "react";

import "./VoterRegistration.css";
import { VoterRegistrationForm } from "./VoterRegistrationForm";
import { VoterTable } from "./VoterTable";

export type VoterRegistrationProps = {
  headerText?: string;
};

export function VoterRegistration(props:VoterRegistrationProps) {

  const registerVoter = () => {
    let b =  1;
  };

  const showVoters = () => {
    let c = 1;
  };

  return (
    <>
    <header>
      <h1>Voter Registration</h1>
    </header>
    <body>
      <button onClick={registerVoter}>Register Voter</button>
      <button onClick={showVoters}>Show Voters</button>

      <VoterRegistrationForm></VoterRegistrationForm>
      <VoterTable></VoterTable>

    </body>
    </>
  );
}

VoterRegistration.defaultProps = {
  headerText: "Voter Registration",
};