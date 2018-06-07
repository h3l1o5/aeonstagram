import React, { Component } from "react";
import { View, Text, Image, Button, Animated, StyleSheet, ScrollView } from "react-native";
import firebase from "react-native-firebase";

import BulletItem from "../components/BulletItem";
import StoryCard from "../components/StoryCard";

class StoryScreen extends Component {
  state = {
    containerOpacity: new Animated.Value(0),
    imgUrl: "http://google.com",
  };

  componentDidMount() {
    Animated.timing(this.state.containerOpacity, {
      toValue: 1,
      duration: 900,
    }).start();

    firebase
      .storage()
      .ref("story-photos/1.jpg")
      .getDownloadURL()
      .then(url => {
        console.log(url);
        this.setState({ imgUrl: url });
      });
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.state.containerOpacity, flex: 1 }}>
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
          <BulletItem text="2018年5月" />
          <View style={styles.story}>
            <StoryCard image={this.state.imgUrl} subtitle="2018/5/28 • 下午5:28" title="金正恩很開心 金正恩拍手手" />
          </View>
          <BulletItem text="2018年4月" />
          <View style={styles.story}>
            <StoryCard image={this.state.imgUrl} subtitle="2018/4/28 • 下午5:28" title="金正恩很開心 金正恩拍手手" />
          </View>
          <View style={styles.story}>
            <StoryCard image={this.state.imgUrl} subtitle="2018/4/20 • 下午5:28" title="金正恩很開心 金正恩拍手手" />
          </View>
          <View style={styles.story}>
            <StoryCard image={this.state.imgUrl} subtitle="2018/4/3 • 下午5:28" title="金正恩很開心 金正恩拍手手" />
          </View>
          <BulletItem text="2018年3月" />
          <View style={styles.story}>
            <StoryCard image={this.state.imgUrl} subtitle="2018/3/11 • 下午5:28" title="金正恩很開心 金正恩拍手手" />
          </View>
          <BulletItem text="2018年2月" />
          <View style={styles.story}>
            <StoryCard image={this.state.imgUrl} subtitle="2018/3/5 • 下午5:28" title="金正恩很開心 金正恩拍手手" />
          </View>
          <View style={styles.story}>
            <StoryCard image={this.state.imgUrl} subtitle="2018/3/1 • 下午5:28" title="金正恩很開心 金正恩拍手手" />
          </View>
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  story: {
    borderLeftColor: "#1E8689",
    borderLeftWidth: 2.5,
    paddingLeft: 30,
    paddingRight: 10,
    paddingVertical: 30,
    marginLeft: 4,
    alignItems: "stretch",
  },
});

export default StoryScreen;
