import React, { Component } from "react";
import { View, Text, Image, Button, Animated, StyleSheet, ScrollView, SectionList, RefreshControl } from "react-native";
import firebase from "react-native-firebase";

import BulletItem from "../components/BulletItem";
import StoryCard from "../components/StoryCard";

class StoryScreen extends Component {
  state = {
    containerOpacity: new Animated.Value(0),
    stories: [
      {
        data: [{ title: "金正恩很開心 金正恩拍手手", date: "2018/5/28 • 下午5:28" }],
        name: "2018年5月",
        id: 0,
      },
      {
        data: [
          { title: "金正恩很開心 金正恩拍手手", date: "2018/4/28 • 下午4:28" },
          { title: "金正恩很開心 金正恩拍手手", date: "2018/4/27 • 下午4:28" },
          { title: "金正恩很開心 金正恩拍手手", date: "2018/4/26 • 下午4:28" },
        ],
        name: "2018年4月",
        id: 1,
      },
      {
        data: [
          { title: "金正恩很開心 金正恩拍手手", date: "2018/3/28 • 下午3:28" },
          { title: "金正恩很開心 金正恩拍手手", date: "2018/3/27 • 下午3:28" },
        ],
        name: "2018年3月",
        id: 2,
      },
      {
        data: [{ title: "金正恩很開心 金正恩拍手手", date: "2018/2/28 • 下午5:28" }],
        name: "2018年2月",
        id: 3,
      },
      {
        data: [],
        name: "起點",
        id: 4,
      },
    ],
  };

  componentDidMount() {
    Animated.timing(this.state.containerOpacity, {
      toValue: 1,
      duration: 500,
    }).start();
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.story}>
        <StoryCard
          image="https://firebasestorage.googleapis.com/v0/b/aeonstagram.appspot.com/o/story-photos%2F1.jpg?alt=media&token=fac6af3e-41b7-4ad9-8c92-1e85edc51e65"
          title={item.title}
          subtitle={item.date}
        />
      </View>
    );
  };

  renderSectionHeader = ({ section }) => {
    const style = [styles.sectionHeader];
    if (section.id === 0) {
      style.push({ paddingTop: 20 });
    }
    return (
      <View style={style}>
        <BulletItem text={section.name} />
      </View>
    );
  };

  render() {
    return (
      <Animated.View style={{ opacity: this.state.containerOpacity, flex: 1 }}>
        <SectionList
          sections={this.state.stories}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={item => item.date}
          initialNumToRender={2}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {}}
          refreshing={false}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  story: {
    borderLeftColor: "#1E8689",
    borderLeftWidth: 2.5,
    paddingLeft: 30,
    paddingRight: 10,
    paddingVertical: 30,
    marginHorizontal: 24,
    alignItems: "stretch",
  },
  sectionHeader: {
    paddingHorizontal: 20,
  },
});

export default StoryScreen;
