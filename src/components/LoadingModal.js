import React, { Component } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { DotIndicator } from "react-native-indicators";

export class LoadingModal extends Component {
  render() {
    const { visible } = this.props;
    return (
      <Modal animationType="fade" transparent visible={visible} onRequestClose={() => {}}>
        <View style={this.props.blur ? [styles.container, styles.blur] : styles.container}>
          <View style={styles.indicatorContainer}>
            <DotIndicator color="#1E8689" size={8} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  blur: {
    backgroundColor: "#fff",
    opacity: 0.6,
  },
});

export default LoadingModal;
