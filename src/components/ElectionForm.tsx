import React, {ChangeEvent, useState} from "react";
import {NewElection} from "../models/elections";

export type ElectionFormProps = {
    numQuestions: number,
    onAddElection: (newElection: NewElection) => void,
    onClose: () => void,
    onCreateElection: (numQuestions: number) => void
}


export function ElectionForm(props: ElectionFormProps) {
    const [electionQuestionForm, setElectionQuestionForm] = useState({
        numberOfQuestions: 0,
        name: "",
        question: "",
    });

    const addElection = () => {
        const tempQuestions = {id: 1, title: electionQuestionForm.question}
        const newElection = {name: electionQuestionForm.name, questions: [tempQuestions]} as NewElection;
        props.onAddElection(newElection)
        props.onClose();
    }

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("target: " + e.target.value);
        setElectionQuestionForm({
            ...electionQuestionForm,
            [e.target.name]:
                e.target.type === "number" ? Number(e.target.value) : e.target.value,
        });
    };

    console.log(props.numQuestions < 1);
    console.log(props.numQuestions);
    console.log("name: " + electionQuestionForm.name);
    return (<>
            <div>
            <form>
                <div>
                    <label htmlFor="name-input">Election Name</label>
                    <input
                        type="text"
                        id="name-input"
                        name="name"
                        value={electionQuestionForm.name}
                        onChange={change}
                    />
                </div>
                <div>
                    <label htmlFor="name-input">Election Question</label>
                    <input
                        type="text"
                        id="question-input"
                        name="question"
                        value={electionQuestionForm.question}
                        onChange={change}
                    />
                </div>
            </form>
            <button type="button" onClick={addElection}>Add Election</button>
            </div>
        </>);
}