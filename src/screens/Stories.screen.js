import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import firebase from "react-native-firebase";
import Ionicon from "react-native-vector-icons/Ionicons";

import BulletItem from "../components/BulletItem";
import StoryCard from "../components/StoryCard";

class StoriesScreen extends Component {
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

  onAddStory = () => {
    this.props.navigation.navigate("AddStory");
  };

  render() {
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

    return (
      <Animated.View style={{ opacity: this.state.containerOpacity, flex: 1 }}>
        <SafeAreaView>
          <SectionList
            sections={this.state.stories}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={item => item.date}
            initialNumToRender={2}
            showsVerticalScrollIndicator={false}
            onRefresh={() => {}}
            refreshing={false}
            stickySectionHeadersEnabled={false}
          />
          <TouchableOpacity style={styles.addButton} activeOpacity={0.6} onPress={this.onAddStory}>
            <Text style={styles.addButtonText}>撰寫故事</Text>
            <Ionicon style={styles.addButtonIcon} name="md-add" />
          </TouchableOpacity>
        </SafeAreaView>
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
    paddingHorizontal: 20.2,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    height: 50,
    width: 120,
    zIndex: 100,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    right: (Dimensions.get("window").width - 120) / 2,
    padding: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  addButtonIcon: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default StoriesScreen;
