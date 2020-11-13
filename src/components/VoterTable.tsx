import React from "react";

import { Voter } from "../models/voters";
import { VoterEditRow } from "./VoterEditRow";
import { VoterViewRow } from "./VoterViewRow";

// import "./VoterTable.css";


export type VoterTableProps = {
  voters: Voter[];
  editVoterId: number;
  onEditVoter: (voterId: number) => void;
  onDeleteVoter: (voterId: number) => void;
  onSaveVoter: (voter: Voter) => void;
  onCancelVoter: () => void;
};


export function VoterTable(props: VoterTableProps) {
  return (
    <table id="voter-table">
      <thead>
        <tr>
        <th className="col-header">
            Select
          </th>
          <th className="col-header">
            Id
          </th>
          <th className="col-header">
          First Name
          </th>
          <th className="col-header">
          Last Name 
          </th>
          <th className="col-header">
          DOB
          </th>
          <th className="col-header">
          Email
          </th>
          <th className="col-header">
          Phone
          </th>
          <th className="col-header">
          County
          </th>
          <th className="col-header">
          Address
          </th>
          <th className="col-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.voters.map((voter) =>
          voter.id === props.editVoterId ? (
            <VoterEditRow
              key={voter.id}
              voter={voter}
              onSaveVoter={props.onSaveVoter}
              onCancelVoter={props.onCancelVoter}
            />
          ) : (
            <VoterViewRow
              key={voter.id}
              voter={voter}
              onEditVoter={props.onEditVoter}
              onDeleteVoter={props.onDeleteVoter}
            />
          )
        )}
      </tbody>
    </table>
  );
}

VoterTable.defaultProps = {
  voters: [],
};