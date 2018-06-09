import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { BarIndicator } from "react-native-indicators";
class StoryCard extends Component {
  state = {
    isImageLoaded: false,
    imageOpacity: new Animated.Value(0),
  };

  handleImageLoaded = () => {
    this.setState({ isImageLoaded: true });
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: 800,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerSubtitle}>{this.props.subtitle}</Text>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Animated.Image
              style={[styles.image, { opacity: this.state.imageOpacity }]}
              resizeMode="cover"
              source={{ uri: this.props.image }}
              onLoad={this.handleImageLoaded}
            />
            {!this.state.isImageLoaded && <BarIndicator color="#1E8689" size={50} />}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#eee",
    borderBottomWidth: 1,
    shadowColor: "#ccc",
    shadowOffset: { width: 2, height: 2 },
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
