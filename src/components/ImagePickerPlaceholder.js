import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export class ImagePickerPlaceholder extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>放張照片吧</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderStyle: "dotted",
    borderColor: "#ccc",
    borderWidth: 2,
  },
  text: {
    fontSize: 20,
    color: "#ccc",
  },
});

export default ImagePickerPlaceholder;
