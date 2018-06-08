import React, { Component } from "react";
import { Text, View, Button, SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { StackActions } from "react-navigation";
import FAIcon from "react-native-vector-icons/FontAwesome";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-crop-picker";

import ImagePickerPlaceholder from "../components/ImagePickerPlaceholder";

export class AddStoryScreen extends Component {
  state = {
    imageSource: "",
  };

  back = () => {
    this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
  };

  pickPhoto = () => {
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

  render() {
    const renderImage = this.state.imageSource ? (
      <Image source={this.state.imageSource} style={{ flex: 1, borderRadius: 15 }} resizeMode="contain" />
    ) : (
      <ImagePickerPlaceholder />
    );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerCloseButton} onPress={this.back}>
            <FAIcon name="times" size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.contentImage} activeOpacity={0.5} onPress={this.pickPhoto}>
            {renderImage}
          </TouchableOpacity>
          <Text style={styles.contentDescription} />
          <Text style={styles.contentTime} />
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
    justifyContent: "center",
  },
  headerCloseButton: {
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  contentContainer: {
    flex: 9,
    justifyContent: "center",
    marginHorizontal: 15,
  },
  contentImage: {
    flex: 6,
  },
  contentDescription: {
    flex: 2,
  },
  contentTime: {
    flex: 2,
  },
});

export default AddStoryScreen;
