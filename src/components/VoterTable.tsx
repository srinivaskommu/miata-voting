import React from "react";

import { Voter } from "../models/voters";
import { VotersSort } from "../models/votersStore";
import { VoterEditRow } from "./VoterEditRow";
import { VoterViewRow } from "./VoterViewRow";

import "./VoterTable.css";


export type VoterTableProps = {
  voters: Voter[];
  editVoterId: number;
  idsToBeDeleted: number[];
  votersSort : VotersSort,
  onEditVoter: (voterId: number) => void;
  onDeleteVoter: (voterId: number) => void;
  onSaveVoter: (voter: Voter) => void;
  onCancelVoter: () => void;
  onSelectedDeleteVoter: (voterIds: number[]) => void;
  onSortVoters: (voter: keyof Voter) => void;
};

const sortArrow = (votersSort: VotersSort, sortCol: keyof Voter) => {
  return (
    votersSort.sortCol === sortCol && (votersSort.sortDir === "asc" ? "v" : "^")
  );
};

export function VoterTable(props: VoterTableProps) {
  return (
    <>
    <table id="voter-table">
      <thead>
        <tr>
        <th className="col-header">
            Select
          </th>
          <th className="col-header">
          <button type="button" onClick={() => props.onSortVoters("id")}>
              Id {sortArrow(props.votersSort, "id")}
            </button>
          </th>
          <th className="col-header">
          <button type="button" onClick={() => props.onSortVoters("firstName")}>
              First Name {sortArrow(props.votersSort, "firstName")}
            </button>
          </th>
          <th className="col-header">
          <button type="button" onClick={() => props.onSortVoters("lastName")}>
              Last Name {sortArrow(props.votersSort, "lastName")}
            </button>
          </th>
          <th className="col-header">
          <button type="button" onClick={() => props.onSortVoters("dob")}>
              DOB {sortArrow(props.votersSort, "dob")}
            </button>
          </th>
          <th className="col-header">
          <button type="button" onClick={() => props.onSortVoters("email")}>
              Email {sortArrow(props.votersSort, "email")}
            </button>
          </th>
          <th className="col-header">
          <button type="button" onClick={() => props.onSortVoters("phone")}>
              Phone {sortArrow(props.votersSort, "phone")}
            </button>
          </th>
          <th className="col-header">
          <button type="button" onClick={() => props.onSortVoters("county")}>
              County {sortArrow(props.votersSort, "county")}
            </button>
          </th>
          <th className="col-header">
          <button type="button" onClick={() => props.onSortVoters("address")}>
              Address {sortArrow(props.votersSort, "address")}
            </button>
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
              idsToBeDeleted={props.idsToBeDeleted}
              onEditVoter={props.onEditVoter}
              onDeleteVoter={props.onDeleteVoter}

            />
          )
        )}
      </tbody>
    </table>
    <td>
      <button type="button" onClick= {()=> props.onSelectedDeleteVoter(props.idsToBeDeleted)}>Delete Selected</button>
    </td>
    </>
  );
}

VoterTable.defaultProps = {
  voters: [],
};