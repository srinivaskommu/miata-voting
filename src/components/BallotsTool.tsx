import React, {} from "react";
import {Answer, Election} from "../models/elections";
import {BallotsList} from "./BallotsList";
import {VoterIdentification} from "./VoterIdentification";
import {BallotVoting} from "./BallotVoting";

export type BallotsToolProps = {
    elections: Election[],
    electionId: number,
    voterId: number,
    onRefreshElections: () => void,
    onElectionSelected: (electionId: number) => void,
    onFetchBallot: (email: string, electionId: number) => void,
    onAnswerChange: (answers: Answer[], answerId: number, value: boolean) => void,
    answers: Answer[],
    onSubmitAnswers: (voterId: number, electionId: number, answers: Answer[]) => void;
}

function getQuestionsForElection(elections: Election[], electionId: number) {
    const election = elections.find((election) => election.id === electionId);
    const questions = (election && election.questions) || [];
    return questions.map((question) => {
        return {...question, answer: false};
    });
}

export function BallotsTool(props: BallotsToolProps) {

    function onCheckIdentity(email: string) {
        props.onFetchBallot(email, props.electionId);
    }

    function onSubmitAnswers(answers: Answer[]){
        props.onSubmitAnswers(props.voterId, props.electionId, answers);
    }

    let widget = <div>"Looks like widget is missing"</div>;

    if (props.electionId < 0) {
        widget = <BallotsList elections={props.elections} onElectionSelected={props.onElectionSelected}
                              onRefreshElections={props.onRefreshElections}/>;
    } else if (props.voterId < 0) {
        widget = <VoterIdentification onCheckIdentity={onCheckIdentity}/>
    } else{
        let answers = []
        if (props.answers.length > 0) {
            answers = props.answers;
        } else {
            answers = getQuestionsForElection(props.elections, props.electionId);
        }

        widget = <BallotVoting answers={answers}
                               onAnswerChange={props.onAnswerChange} onSubmitAnswers={onSubmitAnswers}/>
    }

    return (widget)
}