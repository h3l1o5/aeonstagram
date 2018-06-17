import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import devToolsEnhancer from "remote-redux-devtools";
import createRootRoute from "./router";
import rootReducer from "./redux/reducers";

const store = createStore(rootReducer, devToolsEnhancer());
const rootRoute = createRootRoute();

export default class App extends React.Component {
  render() {
    return <Provider store={store}>{rootRoute}</Provider>;
  }
}
