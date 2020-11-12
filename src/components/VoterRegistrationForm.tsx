import React from "react";

export function VoterRegistrationForm() {

    return (
        <form>
        <div>
          <label htmlFor="firstName-input">firstName</label>
          <input
            type="text"
            id="firstName-input"
            name="firstName"
          />
        </div>
        <div>
          <label htmlFor="lastName-input">lastName</label>
          <input
            type="text"
            id="lastName-input"
            name="lastName"
          />
        </div>
        <div>
          <label htmlFor="dob-input">dob</label>
          <input
            type="number"
            id="dob-input"
            name="dob"
          />
        </div>
        <div>
          <label htmlFor="city-input">city</label>
          <input
            type="text"
            id="city-input"
            name="city"
          />
        </div>
        <div>
          <label htmlFor="state-input">state</label>
          <input
            type="number"
            id="state-input"
            name="state"
          />
        </div>
        <button type="button"> submit
         </button>
      </form>
    );
}

