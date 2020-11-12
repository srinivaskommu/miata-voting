import React, {useEffect} from "react";
import {Election} from "../models/elections";
import {useForm} from "../hooks/useForm";

export type VoterIdentificationProps = {
    onCheckIdentity: (email: string) => void;
}

export function VoterIdentification(props: VoterIdentificationProps) {

    const [emailForm, change] = useForm({email: ""});

    return (
        <>
            <input type="text" id="email-input" name="email" value={emailForm.email} onChange={change}/>
            <button type="button" onClick={() => props.onCheckIdentity(emailForm.email)}>Check Identity</button>
        </>
    );


}