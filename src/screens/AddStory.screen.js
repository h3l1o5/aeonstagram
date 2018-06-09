import React, { Component } from "react";
import { Text, View, Button, SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { StackActions } from "react-navigation";
import FAIcon from "react-native-vector-icons/FontAwesome";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-crop-picker";

import ImagePickerPlaceholder from "../components/ImagePickerPlaceholder";
import CustomTextInput from "../components/CustomTextInput";
import DateInputIOS from "../components/DateInputIOS";
import DateInputAndroid from "../components/DateInputAndroid";

export class AddStoryScreen extends Component {
  state = {
    whatHappened: "",
    date: null,
    imageSource: "",
  };

  handleBack = () => {
    this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
  };

  handlePickPhoto = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      compressImageMaxHeight: 600,
      compressImageMaxWidth: 600,
    })
      .then(image => {
        console.log(image);
        let source = { uri: "data:image/jpeg;base64," + image.data };

        this.setState({
          imageSource: source,
        });

        const imagePath = Platform.OS === "ios" ? image.sourceURL : image.path;

        firebase
          .storage()
          .ref(`story-photos/${image.filename}`)
          .putFile(imagePath, { contentType: image.mime })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePickDate = date => {
    console.log(date);
    this.setState({ date });
  };

  handleChangeWhatHappened = whatHappened => {
    console.log(whatHappened);
    this.setState({ whatHappened });
  };

  render() {
    const renderDatePicker =
      Platform.OS === "ios" ? (
        <DateInputIOS onPickDate={this.handlePickDate} />
      ) : (
        <DateInputAndroid onPickDate={this.handlePickDate} />
      );

    const renderImage = this.state.imageSource ? (
      <Image source={this.state.imageSource} style={{ flex: 1 }} resizeMode="contain" />
    ) : (
      <ImagePickerPlaceholder />
    );

    const isValidToAdd = this.state.date && this.state.whatHappened && this.state.imageSource;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerCloseButton} onPress={this.handleBack}>
            <FAIcon name="times" size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerCheckButton} activeOpacity={isValidToAdd ? 0.5 : 1} onPress={() => {}}>
            <FAIcon name="check" size={22} color={isValidToAdd ? "#000" : "#ccc"} />
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
