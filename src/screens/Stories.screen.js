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
import _ from "lodash";
import moment from "moment";

import BulletItem from "../components/BulletItem";
import StoryCard from "../components/StoryCard";

class StoriesScreen extends Component {
  state = {
    containerOpacity: new Animated.Value(0),
    stories: null,
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("stories")
      .get()
      .then(res => {
        const stories = _.map(res.docs, doc => doc.data());
        return Promise.all(
          _.map(stories, story => {
            return new Promise((resolve, reject) => {
              firebase
                .storage()
                .ref(story.photo)
                .getDownloadURL()
                .then(url => {
                  resolve({ ...story, photoURL: url });
                })
                .catch(err => {
                  reject(err);
                });
            });
          })
        );
      })
      .then(storiesWithPhotoURL => {
        const formattedStories = this._formatStories(storiesWithPhotoURL);
        this.setState({ stories: formattedStories });
        Animated.timing(this.state.containerOpacity, {
          toValue: 1,
          duration: 500,
        }).start();
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleClickAdd = () => {
    this.props.navigation.navigate("AddStory");
  };

  _formatStories = stories => {
    const result = _
      .chain(stories)
      .groupBy(story => moment(story.when).format("YYYYM"))
      .reduce((acc, group) => {
        const sortedGroup = _
          .chain(group)
          .sortBy(["when", "createAt"])
          .reverse()
          .value();

        const groupDate = moment(sortedGroup[0].when);
        return [
          ...acc,
          {
            data: sortedGroup,
            name: groupDate.format("YYYY年M月"),
            priority: groupDate.year() + groupDate.month(),
          },
        ];
      }, [])
      .push({ data: [], name: "起點", priority: 0 })
      .sortBy("priority")
      .reverse()
      .value();

    result[0].isFirstGroup = true;
    result[result.length - 1].isLastGroup = true;

    return result;
  };

  render() {
    renderItem = ({ item }) => {
      return (
        <View style={styles.story}>
          <StoryCard
            image={item.photoURL}
            title={item.whatHappened}
            subtitle={moment(item.date).format("YYYY年M月D日")}
          />
        </View>
      );
    };
    renderSectionHeader = ({ section }) => {
      const style = [styles.sectionHeader];

      if (section.isFirstGroup) {
        style.push({ paddingTop: 20 });
      }
      if (section.isLastGroup) {
        style.push({ paddingBottom: 20 });
      }
      return (
        <View style={style}>
          <BulletItem text={section.name} />
        </View>
      );
    };

    return (
      <Animated.View style={[styles.container, { opacity: this.state.containerOpacity }]}>
        <SafeAreaView>
          {this.state.stories && (
            <SectionList
              sections={this.state.stories}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              keyExtractor={item => item.createAt}
              initialNumToRender={2}
              showsVerticalScrollIndicator={false}
              onRefresh={() => {}}
              refreshing={false}
              stickySectionHeadersEnabled={false}
            />
          )}
        </SafeAreaView>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.6} onPress={this.handleClickAdd}>
          <Text style={styles.addButtonText}>撰寫故事</Text>
          <Ionicon style={styles.addButtonIcon} name="md-add" />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  story: {
    maxHeight: 600,
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
    shadowColor: "#999",
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
