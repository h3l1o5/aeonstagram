import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, DatePickerAndroid } from "react-native";
import moment from "moment";

export default class DateInputAndroid extends Component {
  state = {
    pickedDate: null,
  };

  handlePress = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.pickedDate || new Date(),
        minDate: new Date("2000-01-01"),
        maxDate: new Date(),
        mode: "default",
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ pickedDate: new Date(year, month, day) }, () => {
          this.props.onPickDate();
        });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePress}>
          <Text style={styles.dateText}>
            {this.state.pickedDate ? moment(this.state.pickedDate).format("YYYY年M月D日") : "什麼時候呢？"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 22,
    color: "#4D4D4D",
    fontWeight: "bold",
  },
});
