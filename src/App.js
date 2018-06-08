import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import firebase from "react-native-firebase";

import LoggedOutScreen from "./screens/LoggedOut.screen";
import StoriesScreen from "./screens/Stories.screen";
import AddStoryScreen from "./screens/AddStory.screen";

const StoryRoute = createStackNavigator(
  {
    Stories: StoriesScreen,
    AddStory: AddStoryScreen,
  },
  { initialRouteName: "Stories", headerMode: "none", mode: "modal" }
);

const Route = createSwitchNavigator(
  {
    LoggedOut: LoggedOutScreen,
    App: StoryRoute,
  },
  { initialRouteName: "LoggedOut" }
);

export default class App extends React.Component {
  render() {
    return <AddStoryScreen />;
  }
}
