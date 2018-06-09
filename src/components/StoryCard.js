import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

class StoryCard extends Component {
  render() {
    console.log(this.props.image);
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerSubtitle}>{this.props.subtitle}</Text>
          <Text style={styles.headerTitle}>{this.props.title}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode="cover" source={{ uri: this.props.image }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#eee",
    borderBottomWidth: 1,
    shadowColor: "#ccc",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1.5,
    height: 350,
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerSubtitle: {
    color: "#8E8E8E",
  },
  headerTitle: {
    color: "#4D4D4D",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default StoryCard;
