import React from "react";

import { Voter } from "../models/voters";
import { VoterEditRow } from "./VoterEditRow";
import { VoterViewRow } from "./VoterViewRow";

import "./VoterTable.css";
import { VotersSort } from "../models/votersStore";

export type VoterTableProps = {
  cars: Voter[];
  editVoterId: number;
  carsSort: VotersSort;
  onEditVoter: (carId: number) => void;
  onDeleteVoter: (carId: number) => void;
  onSaveVoter: (car: Voter) => void;
  onCancelVoter: () => void;
  onSortVoters: (car: keyof Voter) => void;
};

const sortArrow = (carsSort: VotersSort, sortCol: keyof Voter) => {
  return (
    carsSort.sortCol === sortCol && (carsSort.sortDir === "asc" ? "v" : "^")
  );
};

export function VoterTable(props: VoterTableProps) {
  return (
    <table id="car-table">
      <thead>
        <tr>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("id")}>
              Id {sortArrow(props.carsSort, "id")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("firstName")}>
              Fist Name {sortArrow(props.carsSort, "firstName")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("lastName")}>
              Last Name {sortArrow(props.carsSort, "lastName")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("dob")}>
              DOB {sortArrow(props.carsSort, "dob")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("email")}>
              Email {sortArrow(props.carsSort, "email")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("phone")}>
              Phone {sortArrow(props.carsSort, "phone")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("address")}>
              Address {sortArrow(props.carsSort, "address")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("county")}>
              County {sortArrow(props.carsSort, "county")}
            </button>
          </th>
          <th className="col-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        { {props.voters.map((voter:Voter) =>
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
        )} }
      </tbody>
    </table>
  );
}

VoterTable.defaultProps = {
  cars: [],
};