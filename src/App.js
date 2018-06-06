import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import firebase from "react-native-firebase";

import LoggedOutScreen from "./screens/LoggedOut.screen";
import StoryScreen from "./screens/Story.screen";

const Route = createSwitchNavigator(
  {
    LoggedOut: LoggedOutScreen,
    App: StoryScreen,
  },
  { initialRouteName: "LoggedOut" }
);

export default class App extends React.Component {
  render() {
    return <Route />;
  }
}
