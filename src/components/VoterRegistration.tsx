import React from "react";

import "./VoterRegistration.css";
import { VoterRegistrationForm } from "./VoterRegistrationForm";
import { VoterTable } from "./VoterTable";

export type VoterRegistrationProps = {
  headerText?: string;
};

export function VoterRegistration(props:VoterRegistrationProps) {



  return (
    <>
    <header>
      <h1>Voter Registration</h1>
    </header>
    <body>
      <button>Register Voter</button>
      <button>Show Voters</button>

      <VoterRegistrationForm></VoterRegistrationForm>
     
    </body>
    </>
  );
}

VoterRegistration.defaultProps = {
  headerText: "Voter Registration",
};