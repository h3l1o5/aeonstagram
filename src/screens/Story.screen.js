import React, { Component } from "react";
import { View, Text, Image, Button } from "react-native";
import firebase from "react-native-firebase";

class StoryScreen extends Component {
  render() {
    const user = firebase.auth().currentUser;
    return (
      <View style={{ flex: 1 }}>
        <Text> {user.email} </Text>
        <Image source={{ uri: user.photoURL }} style={{ width: 50, height: 50 }} />
      </View>
    );
  }
}

export default StoryScreen;
