import React from "react";

export type ElectionQuestionFormProps = {
    numQuestion: number,
    onClose: () => void
}


export function ElectionQuestionFrom(props: ElectionQuestionFormProps) {

    const addElection = () => {
        props.onClose();
    }
    console.log("eqf num: " + props.numQuestion);
    return (<>
        <form>
            <div>
                <label htmlFor="name-input">Election Name</label>
                <input
                    type="text"
                    id="name-input"
                    name="name"
                />
            </div>
            <div>
                <label htmlFor="name-input">Election Question</label>
                <input
                    type="text"
                    id="question-input"
                    name="question"
                />
            </div>
        </form>
        <button type="button" onClick={addElection}>Add Election</button>
        </>);
}