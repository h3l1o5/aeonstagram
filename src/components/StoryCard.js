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
        <View style={styles.headerContainer}>
          <Image style={styles.headerAvatar} source={{ uri: this.props.avatar }} resizeMode="cover" />
          <View style={styles.headerContent}>
            <Text style={styles.headerSubtitle}>{this.props.subtitle}</Text>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
          </View>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerAvatar: {
    height: 40,
    width: 40,
    borderColor: "#BCC3CC",
    borderWidth: 1.5,
    borderRadius: 20,
    marginRight: 10,
  },
  headerContent: {
    flex: 1,
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
    height: 300,
  },
  image: {
    flex: 1,
  },
});

export default StoryCard;
