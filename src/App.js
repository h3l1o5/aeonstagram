import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "remote-redux-devtools";
import createRootRoute from "./router";
import rootReducer from "./redux/reducers";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const rootRoute = createRootRoute();

sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  render() {
    return <Provider store={store}>{rootRoute}</Provider>;
  }
}
