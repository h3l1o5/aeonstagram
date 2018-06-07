import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";

class BulletItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FAIcon name="circle" style={styles.bulletPoint} />
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  bulletPoint: {
    fontSize: 12,
    color: "#1E8689",
  },
  text: {
    marginLeft: 20,
    fontSize: 27,
    fontWeight: "bold",
    color: "#4D4D4D",
  },
});

export default BulletItem;
