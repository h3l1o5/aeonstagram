import React, { Component } from "react";
import { View, Text, Image, Button, Animated } from "react-native";
import firebase from "react-native-firebase";

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
    const user = firebase.auth().currentUser;
    return (
      <Animated.View style={{ flex: 1, opacity: this.state.containerOpacity }}>
        <Text> {user.email} </Text>
        <Image source={{ uri: user.photoURL }} style={{ width: 50, height: 50, borderRadius: 50 }} />
      </Animated.View>
    );
  }
}

export default StoryScreen;
