import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export class LoggedOutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Logged out </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E8689",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoggedOutScreen;
