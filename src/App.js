import React from "react";
import createRootRoute from "./router";

export default class App extends React.Component {
  render() {
    return createRootRoute();
  }
}
