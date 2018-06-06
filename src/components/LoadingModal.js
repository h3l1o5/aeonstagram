import React, { Component } from "react";
import { Text, View, TouchableHighlight, Modal, Image, ActivityIndicator } from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

export class LoadingModal extends Component {
  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {}}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              width: 80,
              height: 80,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DotIndicator color="#1E8689" size={8} />
          </View>
        </View>
      </Modal>
    );
  }
}

export default LoadingModal;
