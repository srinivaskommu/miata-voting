import React from "react";

export function VoterRegistrationForm() {

    return (
        <form>
        <div>
          <label htmlFor="firstName-input">First Name</label>
          <input
            type="text"
            id="firstName-input"
            name="firstName"
          />
        </div>
        <div>
          <label htmlFor="lastName-input">Last Name</label>
          <input
            type="text"
            id="lastName-input"
            name="lastName"
          />
        </div>
        <div>
          <label htmlFor="dob-input">DOB</label>
          <input
            type="text"
            id="dob-input"
            name="dob"
          />
        </div>
        <div>
          <label htmlFor="city-input">Email</label>
          <input
            type="text"
            id="email-input"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="phone-input">Phone</label>
          <input
            type="text"
            id="phone-input"
            name="phone"
          />
        </div>
        <div>
          <label htmlFor="county-input">County</label>
          <input
            type="text"
            id="county-input"
            name="county"
          />
        </div>
        <div>
          <label htmlFor="address-input">Address</label>
          <input
            type="text"
            id="address-input"
            name="address"
          />
        </div>
        <button type="button"> Submit
         </button>
      </form>
    );
}

