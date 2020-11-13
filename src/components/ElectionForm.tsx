import React, {ChangeEvent, useState} from "react";
import {NewElection, Question} from "../models/elections";

export type ElectionFormProps = {
    questions: Question[],
    onAddQuestion: (question: Question) => void,
    onClose: () => void,
    onCreateElection: (newElection: NewElection) => void
}


export function ElectionForm(props: ElectionFormProps) {
    const [electionQuestionForm, setElectionQuestionForm] = useState({
        name: "",
        question: "",
    });

    const addElection = () => {
        const newElection = {name: electionQuestionForm.name, questions: props.questions} as NewElection;
        props.onCreateElection(newElection)
        props.onClose();

        setElectionQuestionForm({name: "",
            question: "",})
    }

    const addQuestion = () => {
        const newQuestion = {id: props.questions.length,title : electionQuestionForm.question} as Question;
        props.onAddQuestion(newQuestion);
        setElectionQuestionForm({...electionQuestionForm,
            question: "",})
    }

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("target: " + e.target.value);
        setElectionQuestionForm({
            ...electionQuestionForm,
            [e.target.name]:
                e.target.type === "number" ? Number(e.target.value) : e.target.value,
        });
    };

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
                <button type="button" onClick={addElection}>Create Election</button>
                <button type="button" onClick={addQuestion}>Add Question</button>
            </div>
        </>);
}