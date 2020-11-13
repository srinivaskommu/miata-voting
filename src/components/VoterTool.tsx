import React from "react";
import { VoterFormContainer } from "../containers/VoterFormContainer";
import { VoterTableContainer } from "../containers/VoterTableContainer";

export type VoterToolProps = {
    onRegisterSelected: (isRegister: string) => void;
    isRegister: string
}

export function VoterTool(props: VoterToolProps) {

    let widget = <div>
        <button type="button" onClick={() => props.onRegisterSelected("REGISTER")}>
            Register
</button>
        <button type="button" onClick={() => props.onRegisterSelected("SHOW")}>
            Show
</button>
    </div>;

    if (props.isRegister === "REGISTER") {
        widget = <VoterFormContainer></VoterFormContainer>;
    } else if (props.isRegister === "SHOW") {
        widget = <VoterTableContainer></VoterTableContainer>
    }

    return (widget);
}