import React, {useState} from "react";
import {Answer} from "../models/elections";
import {HTMLFormControls} from "../hooks/useForm";

export type BallotAnswerProps = {
    answer: Answer;
    onAnswerChange: (questionId: number, value: boolean) => void;
}

export function BallotAnswer(props: BallotAnswerProps) {

    // const [ questions, setQuestions ] = useState([]);
    //
    // const checkQuestion = (index, value) => {
    //     const newQuestions = [...questions];
    //     newQuestions[index] = value;
    //     setQuestions(newQuestions);
    // }


    const [answerForm, setAnswerForm] = useState({answer: false});

    const toggle = (e: React.ChangeEvent<HTMLFormControls>) => {

        const newValue = !answerForm.answer;
        setAnswerForm({
            ...answerForm,
            answer: newValue
        });

        props.onAnswerChange(props.answer.id, newValue);
    }

    return (
        <div>{props.answer.title}<span><input type="checkbox"
                                                checked={answerForm.answer}
                                                id={"answer-" + props.answer.id} name={String(props.answer.id - 1)}
                                                onChange={toggle}/></span></div>
    )

}