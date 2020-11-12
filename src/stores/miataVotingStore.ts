import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/index";
import thunk from "redux-thunk";
import {miataVotingReducer} from "../reducers/miataVotingReducer";

export const miataVotingStore = createStore(
    miataVotingReducer,
    composeWithDevTools(applyMiddleware(thunk))
);