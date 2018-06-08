import React, { Component } from "react";
import { Text, View, Button, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackActions } from "react-navigation";
import FAIcon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";

const imagePickerOptions = {
  title: "選擇照片",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

export class AddStoryScreen extends Component {
  state = {
    avatarSource: "",
  };
  back = () => {
    this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
  };

  pickPhoto = () => {
    ImagePicker.showImagePicker(imagePickerOptions, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log(response);

        let source = { uri: "data:image/jpeg;base64," + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  render() {
    const renderImage = this.state.avatarSource ? <Image source={this.state.avatarSource} style={{ flex: 1 }} /> : null;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerCloseButton} onPress={this.back}>
            <FAIcon name="times" size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Button title="image picker" onPress={this.pickPhoto} />
          {renderImage}
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
  },
});

export default AddStoryScreen;
