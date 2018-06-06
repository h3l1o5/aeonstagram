import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { LoggedOutScreen } from "./screens/LoggedOut.screen";

export default class App extends React.Component {
  render() {
    return <LoggedOutScreen />;
  }
}
