import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {ElectionResultTable} from "../components/ElectionResultTable";
import {MiataVotingState} from "../models/miataVotingStore";
import {createShowResultRequestAction, fetchBallotAnswers, refreshElections} from "../actions/electionsAction";
import {BallotAnswer, Election, Question, ResultCount,} from "../models/elections";

const computeResult = (answers: BallotAnswer[]) => {
    // answers.forEach(ar)
    // return answers.reduce((result, entry) => {
    //
    // });
    let sums = [] as ResultCount[];
    for (var i = 0; i < answers.length; i++) {
        const votesFor = sumQuestion(answers, i);
        console.log("votesFor: " + votesFor);
        const votesAgainst = answers.length - votesFor;
        console.log("votesAgainst: " + votesAgainst);
        sums = [...sums, {title: answers[0].answers[i].title, for : votesFor, against: votesAgainst}];
    }
    return sums;
};

const sumQuestion = (answers: BallotAnswer[], idx: number) => {
    return answers.reduce((total, entry) => {
        return total + (entry.answers[idx].answer ? 1 : 0);
    }, 0);
};

export function ElectionTableContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {
        return {elections: state.elections.elections, results: state.elections.results};
    }) as {resultsCount: ResultCount[]; elections: Election[]; results: BallotAnswer[];}

    const resultCount = computeResult(stateProps.results);
    stateProps.resultsCount = resultCount;
    console.log("resultsProp: " + stateProps.results);
    console.log("resultsCount: " + resultCount);
    console.log("resultCountPro: " + stateProps.resultsCount);

    // stateProps.resultsCount = useMemo(() => computeResult(stateProps.resultsCount), [
    //     stateProps.resultsCount,
    // ]); // how is this different from line 36
    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onRefreshTable: refreshElections,
            onViewResults: fetchBallotAnswers
        },
        dispatch
    ), [dispatch]);

    useEffect(() => {
        refreshElections()(dispatch);
    }, [dispatch]);
    return <ElectionResultTable {...stateProps} {...boundActionProps}/>
}