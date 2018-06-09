import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, DatePickerIOS, Modal, NativeModules } from "react-native";
import moment from "moment";

export default class DateInputIOS extends Component {
  state = {
    isDatePickerVisible: false,
    pickedDate: null,
  };

  handlePress = () => {
    this.setState({ isDatePickerVisible: true });
  };

  handleDateChange = date => {
    this.setState({ pickedDate: date });
  };

  handleModalCloseAttempt = () => {
    if (this.state.pickedDate) {
      this.setState({ isDatePickerVisible: false });
      this.props.onPickDate(this.state.pickedDate);
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
        <Modal
          visible={this.state.isDatePickerVisible}
          transparent={true}
          animationType="fade"
          onShow={() => {
            if (!this.state.pickedDate) {
              this.setState({ pickedDate: new Date() });
            }
          }}
        >
          <View style={styles.datePickerModal}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={this.handleModalCloseAttempt}>
              <View />
            </TouchableOpacity>
            <DatePickerIOS
              mode="date"
              date={this.state.pickedDate || new Date()}
              minimumDate={new Date("2000-01-01")}
              maximumDate={new Date()}
              onDateChange={this.handleDateChange}
              locale={NativeModules.SettingsManager.settings.AppleLocale}
            />
          </View>
        </Modal>
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
  datePickerModal: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
    backgroundColor: "white",
    opacity: 0.8,
  },
});
