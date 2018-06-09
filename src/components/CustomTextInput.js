import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

export default class CustomTextInput extends Component {
  state = {
    currentLength: 0,
  };

  handleChangeText = text => {
    this.setState({ currentLength: text.length });
    this.props.onChangeText(text);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="發生了什麼事？"
          placeholderTextColor="#4D4D4D"
          underlineColorAndroid="transparent"
          returnKeyType="done"
          maxLength={15}
          onChangeText={this.handleChangeText}
        />
        <Text style={styles.hint}>{15 - this.state.currentLength}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 14,
    fontSize: 22,
    fontWeight: "bold",
    padding: 0,
  },
  hint: {
    flex: 1,
    fontSize: 10,
    color: "#bbb",
  },
});
