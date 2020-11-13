import React from "react";
import { useForm } from "../hooks/useForm";
import { Voter } from "../models/voters";

export type VoterEditRowProps = {
  voter: Voter;
  onSaveVoter: (voter: Voter) => void;
  onCancelVoter: () => void;
};

export type VoterForm = {
    firstName: string;
    lastName: string;
    dob:string;
    email: string;
    phone: string;
    address: string;
    county:string;
};

export const VoterEditRow = (props: VoterEditRowProps) => {
  const [voterForm,change, setVoterForm] = useForm({
    firstName: props.voter.firstName,
    lastName: props.voter.lastName,
    dob: props.voter.dob,
    email: props.voter.email,
    phone: props.voter.phone,
    address: props.voter.address,
    county: props.voter.county,
  });



  const saveVoter = () => {
    props.onSaveVoter({
      ...voterForm,
      id: props.voter.id,
    });
  };

  return (
    <tr>
      <td>{props.voter.id}</td>
      <td>
        <input
          type="text"
          id="firstName-input"
          name="firstName"
          value={voterForm.firstName}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          id="lastName-input"
          name="lastName"
          value={voterForm.lastName}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          id="dob-input"
          name="dob"
          value={voterForm.dob}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          id="email-input"
          name="email"
          value={voterForm.email}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          id="phone-input"
          name="phone"
          value={voterForm.phone}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          id="county-input"
          name="county"
          value={voterForm.county}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          id="address-input"
          name="address"
          value={voterForm.address}
          onChange={change}
        />
      </td>
      <td>
        <button type="button" onClick={saveVoter}>
          Save
        </button>
        <button type="button" onClick={props.onCancelVoter}>
          Cancel
        </button>
      </td>
    </tr>
  );
};