import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { StackActions } from "react-navigation";
import FAIcon from "react-native-vector-icons/FontAwesome";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-crop-picker";
import uuidv1 from "uuid/v1";

import ImagePickerPlaceholder from "../components/ImagePickerPlaceholder";
import CustomTextInput from "../components/CustomTextInput";
import DateInputIOS from "../components/DateInputIOS";
import DateInputAndroid from "../components/DateInputAndroid";
import LoadingModal from "../components/LoadingModal";

export class AddStoryScreen extends Component {
  state = {
    whatHappened: "",
    when: null,
    image: null,
    isLoading: false,
  };

  handleBack = () => {
    this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
  };

  handleSubmit = () => {
    if (!this.state.whatHappened || !this.state.when || !this.state.image) {
      return;
    }

    this.setState({ isLoading: true });

    const uuid = uuidv1();
    firebase
      .storage()
      .ref(`story-photos/${uuid}.jpg`)
      .putFile(this.state.image.path, { contentType: this.state.image.mime })
      .then(res => {
        return firebase
          .firestore()
          .collection("stories")
          .add({
            createAt: new Date(),
            creator: firebase.auth().currentUser.email,
            creatorAvatar: firebase.auth().currentUser.photoURL,
            whatHappened: this.state.whatHappened,
            when: this.state.when,
            photo: `story-photos/${uuid}.jpg`,
            photoURL: res.downloadURL,
          });
      })
      .then(() => {
        this.setState({ isLoading: false });
        this.handleBack();
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.error(err);
      });
  };

  handlePickPhoto = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
      compressImageMaxHeight: 600,
      compressImageMaxWidth: 600,
      compressImageQuality: 1,
    })
      .then(image => {
        if (image.mime.split("/")[0] !== "image") {
          return;
        }

        this.setState({ image });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePickDate = when => {
    this.setState({ when });
  };

  handleChangeWhatHappened = whatHappened => {
    this.setState({ whatHappened });
  };

  render() {
    const renderDatePicker =
      Platform.OS === "ios" ? (
        <DateInputIOS onPickDate={this.handlePickDate} />
      ) : (
        <DateInputAndroid onPickDate={this.handlePickDate} />
      );

    const renderImage = this.state.image ? (
      <Image
        source={{ uri: "data:image/jpeg;base64," + this.state.image.data }}
        style={{ flex: 1 }}
        resizeMode="contain"
      />
    ) : (
      <ImagePickerPlaceholder />
    );

    const isValidToSubmit = this.state.when && this.state.whatHappened && this.state.image;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerCloseButton} onPress={this.handleBack}>
            <FAIcon name="times" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerCheckButton}
            activeOpacity={isValidToSubmit ? 0.5 : 1}
            onPress={this.handleSubmit}
          >
            <FAIcon name="check" size={22} color={isValidToSubmit ? "#000" : "#ccc"} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentDescription}>
            <CustomTextInput onChangeText={this.handleChangeWhatHappened} />
          </View>
          <View style={styles.contentTime}>{renderDatePicker}</View>
          <TouchableOpacity style={styles.contentImage} activeOpacity={0.5} onPress={this.handlePickPhoto}>
            {renderImage}
          </TouchableOpacity>
        </View>
        <LoadingModal visible={this.state.isLoading} blur />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerCloseButton: {
    marginLeft: 20,
    alignSelf: "center",
  },
  headerCheckButton: {
    marginRight: 20,
    alignSelf: "center",
  },
  contentContainer: {
    flex: 9,
    justifyContent: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  contentImage: {
    flex: 8,
  },
  contentDescription: {
    flex: 1,
  },
  contentTime: {
    flex: 1,
  },
});

export default AddStoryScreen;
