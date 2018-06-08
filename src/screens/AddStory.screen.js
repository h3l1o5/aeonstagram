import React, { Component } from "react";
import { Text, View, Button, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { StackActions } from "react-navigation";
import FAIcon from "react-native-vector-icons/FontAwesome";

export class AddStoryScreen extends Component {
  back = () => {
    this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerCloseButton} onPress={this.back}>
            <FAIcon name="times" size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer} />
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
    backgroundColor: "green",
  },
});

export default AddStoryScreen;
