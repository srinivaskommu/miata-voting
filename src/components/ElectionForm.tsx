import React, {ChangeEvent, useState} from "react";
import {ElectionResultTable} from "./ElectionResultTable";
import {ElectionQuestionFrom} from "./ElectionQuestionForm";

export function ElectionForm() {
    const [electionForm, setElectionForm] = useState({
        showElectionQuestionFrom: false,
        numberOfQuestions: 0
    });

    const createElection = () => {
        setElectionForm({showElectionQuestionFrom: true, numberOfQuestions: electionForm.numberOfQuestions});
    }

    const closeCreateElection = () =>  {
        setElectionForm({showElectionQuestionFrom: false, numberOfQuestions: 0});
    }

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setElectionForm(
            {...electionForm, [e.target.name]:
                    e.target.type === "number" ? Number(e.target.value) : e.target.value,}
        );
    }
    return (
        <header>
            <h1>
                Available Election Results
            </h1>
            <ElectionResultTable></ElectionResultTable>
            {electionForm.showElectionQuestionFrom &&
                <ElectionQuestionFrom numQuestion={electionForm.numberOfQuestions} onClose={closeCreateElection}></ElectionQuestionFrom>}
            { !electionForm.showElectionQuestionFrom &&
            <div>
                <div>
                    <label htmlFor="question-number-input">Number of election questions</label>
                    <input
                        type="text"
                        id="question-number-input"
                        name="numberOfQuestions"
                        value={electionForm.numberOfQuestions}
                        onChange={change}
                    />
                </div>
                <button type="button" onClick={createElection}>Create Election</button>
            </div>
            }
        </header>
    );
}