import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { BarIndicator } from "react-native-indicators";
import FAIcon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import _ from "lodash";

class StoryCard extends Component {
  state = {
    love: 0,
    givenLoveBatch: 0,
    isImageLoaded: false,
    imageOpacity: new Animated.Value(0),
  };

  componentDidMount() {
    this.setState({ love: this.props.love });
    this.giveLoveDebounce = _.debounce(() => {
      this.props.onClickLove(this.props.id, this.state.givenLoveBatch);
      this.setState({ givenLoveBatch: 0 });
    }, 2000);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.love !== nextProps.love) {
      this.love.rubberBand(1000);
      this.setState({ love: nextProps.love });
    }
  }

  handleImageLoaded = () => {
    this.setState({ isImageLoaded: true });
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  handleClickLove = () => {
    this.love.rubberBand(1000);
    this.setState({ love: this.state.love + 1, givenLoveBatch: this.state.givenLoveBatch + 1 });
    this.giveLoveDebounce();
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.onClickImage(this.props.image);
            }}
            style={{ flex: 1 }}
          >
            <Animated.Image
              style={[styles.image, { opacity: this.state.imageOpacity }]}
              resizeMode="cover"
              source={{ uri: this.props.image }}
              onLoad={this.handleImageLoaded}
            />
          </TouchableOpacity>
          {!this.state.isImageLoaded && <BarIndicator color="#1E8689" size={50} />}
        </View>
        <View style={styles.footerContainer}>
          <Animatable.View
            style={styles.footerLoveCounter}
            ref={ref => {
              this.love = ref;
            }}
          >
            <FAIcon name="heart" color="#F25268" size={15} style={{ marginRight: 5 }} />
            <Text style={{ color: "#aaa" }}>{this.state.love}</Text>
          </Animatable.View>
          <TouchableOpacity style={styles.footerLoveButton} onPress={this.handleClickLove}>
            <Animatable.View animation="pulse" duration={500} iterationCount="infinite">
              <FAIcon name="heart" color="#fff" size={20} />
            </Animatable.View>
          </TouchableOpacity>
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
    elevation: 5,
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
  headerContent: {},
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
  footerContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerLoveButton: {
    backgroundColor: "#F25268",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    elevation: 1,
  },
  footerLoveCounter: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default StoryCard;
