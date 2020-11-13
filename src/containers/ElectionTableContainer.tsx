import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {ElectionResultTable} from "../components/ElectionResultTable";
import {MiataVotingState} from "../models/miataVotingStore";
import {fetchBallots, refreshElections} from "../actions/electionsAction";
import {Ballot, Election,  ResultCount,} from "../models/elections";

const computeResult = (ballots: Ballot[]) => {
    let sums = [] as ResultCount[];
    if (ballots.length < 1) {
        return [];
    }
    for (var i = 0; i < ballots[0].answers.length; i++) {
        const votesFor = sumQuestion(ballots, i);
        console.log("votesFor: " + votesFor);
        const votesAgainst = ballots.length - votesFor;
        console.log("votesAgainst: " + votesAgainst);
        sums = [...sums, {title: ballots[0].answers[i].title, for : votesFor, against: votesAgainst}];
    }
    return sums;
};

// const computeResult = (ballots: Ballot[]) => {
//     return ballots.reduce((sums, entry, idx)  => {
//         const votesFor = sumQuestion(ballots, idx);
//         const votesAgainst = ballots.length - votesFor;
//         return [...sums, {title: ballots[0].answers[idx].title, for : votesFor, against: votesAgainst}];
//
//     }, [] as ResultCount[])
// };

// };

const sumQuestion = (answers: Ballot[], idx: number) => {
    console.log("sumQuestion");
    console.log(idx);
    console.log(answers);
    return answers.reduce((total, entry) => {
        return total + (entry.answers[idx].answer ? 1 : 0);
    }, 0);
};

export function ElectionTableContainer() {
    const stateProps = useSelector((state: MiataVotingState) => {
        return {elections: state.elections.elections, results: state.elections.results};
    }) as {resultsCount: ResultCount[]; elections: Election[]; results: Ballot[];}

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
            onViewResults: fetchBallots
        },
        dispatch
    ), [dispatch]);

    useEffect(() => {
        refreshElections()(dispatch);
    }, [dispatch]);
    return <ElectionResultTable {...stateProps} {...boundActionProps}/>
}