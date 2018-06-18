import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { connect } from "react-redux";
import { StackActions } from "react-navigation";
import FAIcon from "react-native-vector-icons/FontAwesome";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-crop-picker";

import ImagePickerPlaceholder from "../components/ImagePickerPlaceholder";
import CustomTextInput from "../components/CustomTextInput";
import DateInputIOS from "../components/DateInputIOS";
import DateInputAndroid from "../components/DateInputAndroid";

import { actions as storiesActions } from "../redux/reducers/stories";

export class AddStoryScreen extends Component {
  state = {
    whatHappened: "",
    when: null,
    image: null,
  };

  handleBack = () => {
    this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
  };

  handleSubmit = () => {
    if (!this.state.whatHappened || !this.state.when || !this.state.image) {
      return;
    }

    this.props.addNewStory({
      currentUser: firebase.auth().currentUser,
      image: this.state.image,
      whatHappened: this.state.whatHappened,
      when: this.state.when,
    });

    this.handleBack();
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

const mapDispatchToProps = dispatch => ({
  addNewStory: newStory => dispatch(storiesActions.addNewStory(newStory)),
});

export default connect(
  null,
  mapDispatchToProps
)(AddStoryScreen);
