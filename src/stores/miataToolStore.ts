import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { voterRegistrationToolReducers } from "../reducers/voterRegistrationToolReducers";

export const carToolStore = createStore(
    voterRegistrationToolReducers,
  composeWithDevTools(applyMiddleware(thunk))
);