import React, { Component } from "react";
import { View, Text, Image, Button, Animated } from "react-native";

class StoryScreen extends Component {
  state = {
    containerOpacity: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.containerOpacity, {
      toValue: 1,
      duration: 900,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={{ flex: 1, opacity: this.state.containerOpacity, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Stories</Text>
      </Animated.View>
    );
  }
}

export default StoryScreen;
