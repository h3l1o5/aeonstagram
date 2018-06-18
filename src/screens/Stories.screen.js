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
} from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import Ionicon from "react-native-vector-icons/Ionicons";
import _ from "lodash";
import moment from "moment";
import ImageViewer from "react-native-image-zoom-viewer";

import BulletItem from "../components/BulletItem";
import StoryCard from "../components/StoryCard";

import { actions as storiesActions } from "../redux/reducers/stories";
import { convertStoriesToSectionListFormat } from "../helper";

class StoriesScreen extends Component {
  state = {
    containerOpacity: new Animated.Value(0),
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
        const addedStories = _.chain(snapshot.docChanges)
          .filter(change => change.type === "added")
          .map(change => {
            return { ...change.doc.data(), id: change.doc.id };
          })
          .value();

        if (addedStories.length !== 0) {
          this.props.onReceiveNewStories(addedStories);
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

  handleClickStoryLove = (id, amount) => {
    this.props.giveStoryLove(id, amount);
  };

  handleRefresh = () => {
    this.props.refreshStories();
  };

  render() {
    const renderItem = ({ item }) => {
      return (
        <View style={styles.story}>
          <StoryCard
            id={item.id}
            avatar={item.creatorAvatar}
            image={item.photoURL}
            title={item.whatHappened}
            love={item.love || 0}
            subtitle={moment(item.when).format("YYYY年M月D日")}
            onClickImage={this.handleClickStoryImage}
            onClickLove={this.handleClickStoryLove}
          />
        </View>
      );
    };
    const renderSectionHeader = ({ section }) => {
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
          {this.props.stories && (
            <SectionList
              sections={this.props.stories}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              keyExtractor={item => item.createAt}
              initialNumToRender={2}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={false}
              refreshing={this.props.isOnRefreshing}
              onRefresh={this.handleRefresh}
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

const mapStateToProps = state => ({
  stories: convertStoriesToSectionListFormat(state.stories.data),
  isOnRefreshing: state.stories.isOnRefreshing,
});

const mapDispatchToProps = dispatch => ({
  onReceiveNewStories: newStories => dispatch(storiesActions.onReceiveNewStories(newStories)),
  refreshStories: () => dispatch(storiesActions.refreshStories()),
  giveStoryLove: (id, amount) => dispatch(storiesActions.giveStoryLove(id, amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoriesScreen);
