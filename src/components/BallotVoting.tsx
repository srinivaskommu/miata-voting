import React from "react";
import {Answer} from "../models/elections";
import {BallotAnswer} from "./BallotAnswer";

export type BallotVotingProps = {
    answers: Answer[];
    onAnswerChange: (answers: Answer[], answerId: number, value: boolean) => void;
    onSubmitAnswers: (answers: Answer[]) => void;
}

export function BallotVoting(props: BallotVotingProps) {

    const onAnswerChange = (answerId: number, value: boolean) => {
        props.onAnswerChange(props.answers, answerId, value);
    }

    return (
        <>
            {props.answers.map((answer) =>
                <BallotAnswer key = {answer.id} answer={answer} onAnswerChange={onAnswerChange}/>) }
                <button type="button" onClick={() => props.onSubmitAnswers(props.answers)}>Cast Vote</button>
        </>
    );


}