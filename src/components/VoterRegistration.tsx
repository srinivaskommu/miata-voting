import React from "react";

import "./VoterRegistration.css";
import { VoterRegistrationForm } from "./VoterRegistrationForm";
import { VoterTable } from "./VoterTable";

export type VoterRegistrationProps = {
  headerText?: string;
};

export function VoterRegistration() {

  const registerVoter = () => {
    return <VoterRegistrationForm></VoterRegistrationForm>;
  };

  const showVoters = () => {
    return <VoterTable></VoterTable>
  };

  return (
    <>
    <header>
      <h1>Voter Registration</h1>
    </header>
    <body>
      <button onClick={registerVoter}>Register Voter</button>
      <button onClick={showVoters}>Show Voters</button>
    </body>
    </>
  );
}

VoterRegistration.defaultProps = {
  headerText: "Voter Registration",
};