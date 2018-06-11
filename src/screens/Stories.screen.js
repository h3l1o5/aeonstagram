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
  Modal,
  BackHandler,
} from "react-native";
import firebase from "react-native-firebase";
import Ionicon from "react-native-vector-icons/Ionicons";
import _ from "lodash";
import moment from "moment";
import ImageViewer from "react-native-image-zoom-viewer";
import { BarIndicator } from "react-native-indicators";

import BulletItem from "../components/BulletItem";
import StoryCard from "../components/StoryCard";

class StoriesScreen extends Component {
  state = {
    containerOpacity: new Animated.Value(0),
    stories: null,
    imageViewer: {
      isShowing: false,
      url: null,
    },
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("stories")
      .onSnapshot(snapshot => {
        const stories = _
          .chain(snapshot.docChanges)
          .filter(change => change.type === "added")
          .map(change => change.doc.data())
          .value();

        const formattedStories = this._formatStories(stories);

        if (!this.state.stories) {
          this.setState({ stories: formattedStories });
        } else {
          const newStories = _
            .chain(formattedStories)
            .reduce((acc, group) => {
              const existedGroupIndex = _.findIndex(acc, { priority: group.priority });
              if (existedGroupIndex === -1) {
                return [group, ...acc];
              } else {
                acc[existedGroupIndex].data = _
                  .chain([...group.data, ...acc[existedGroupIndex].data])
                  .sortBy("when")
                  .reverse()
                  .value();

                return acc;
              }
            }, this.state.stories)
            .sortBy("priority")
            .reverse()
            .value();

          console.log(newStories);
          this.setState({ stories: newStories });
        }
        Animated.timing(this.state.containerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
  }

  handleClickAdd = () => {
    this.props.navigation.navigate("AddStory");
  };

  handleClickStoryImage = imageURL => {
    this.setState({ imageViewer: { isShowing: true, url: imageURL } });
  };

  handleCloseImageViewer = () => {
    this.setState({ imageViewer: { isShowing: false, url: null } });
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
            priority: groupDate.year() * 10 + groupDate.month(),
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
            avatar={item.creatorAvatar}
            image={item.photoURL}
            title={item.whatHappened}
            subtitle={moment(item.when).format("YYYY年M月D日")}
            onClickImage={this.handleClickStoryImage}
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
        <SafeAreaView style={{ flex: 1 }}>
          {this.state.stories && (
            <SectionList
              sections={this.state.stories}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              keyExtractor={item => item.createAt}
              initialNumToRender={2}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={false}
            />
          )}
        </SafeAreaView>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.6} onPress={this.handleClickAdd}>
          <Text style={styles.addButtonText}>撰寫故事</Text>
          <Ionicon style={styles.addButtonIcon} name="md-add" />
        </TouchableOpacity>
        <Modal
          visible={this.state.imageViewer.isShowing}
          transparent={true}
          onRequestClose={() => {
            this.setState({ imageViewer: { isShowing: false, url: null } });
          }}
          animationType="fade"
        >
          <ImageViewer
            imageUrls={[
              {
                url: this.state.imageViewer.url,
              },
            ]}
            onSwipeDown={this.handleCloseImageViewer}
            renderIndicator={() => null}
            maxOverflow={0}
          />
        </Modal>
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
    backgroundColor: "#fff",
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
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
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
