import React from "react";
import { useForm } from "../hooks/useForm";
import { NewVoter } from "../models/voters";

export type VoterFormProps = {
  // buttonText: string;
  onSubmitVoter: (newCar: NewVoter) => void;
};

export function VoterForm(props: VoterFormProps) {

  const [voterForm, change, setVoterForm] = useForm({
    firstName: "",
    lastName: "",
    dob:"",
    email: "",
    phone: "",
    address: "",
    county:"",
  });


  const submitVoter = () => {
    props.onSubmitVoter({
      ...voterForm,
    });
  };


    return (
        <form>
        <div>
          <label htmlFor="firstName-input">First Name</label>
          <input
            type="text"
            id="firstName-input"
            name="firstName"
            value={voterForm.firstName}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="lastName-input">Last Name</label>
          <input
            type="text"
            id="lastName-input"
            name="lastName"
            value={voterForm.lastName}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="dob-input">DOB</label>
          <input
            type="text"
            id="dob-input"
            name="dob"
            value={voterForm.dob}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="firstName-input">Email</label>
          <input
            type="text"
            id="email-input"
            name="email"
            value={voterForm.email}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="lastName-input">Phone</label>
          <input
            type="text"
            id="phone-input"
            name="phone"
            value={voterForm.phone}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="dob-input">County</label>
          <input
            type="text"
            id="county-input"
            name="county"
            value={voterForm.county}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="address-input">Address</label>
          <input
            type="text"
            id="address-input"
            name="address"
            value={voterForm.address}
            onChange={change}
          />
        </div>
        <button type="button" onClick={submitVoter}> Complete Registration
         </button>
      </form>
    );


}