import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from "react-native";

export class LoggedOutScreen extends Component {
  onSingin = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}> 歡迎使用Airbnb。 </Text>
        <TouchableOpacity onPress={this.onSignin} style={styles.signInButton}>
          <Text style={{ color: "#1E8689", fontSize: 18, fontWeight: "600" }}>使用Facebook帳號登入</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onSignin} style={styles.moreOptionButton}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}> 更多選項 </Text>
        </TouchableOpacity>
        <Text style={styles.info}>
          輕點繼續、建立帳號或「更多」選項，及代表我同意Airbnb的服務條款、付款服務條款、隱私政策與反歧視政策。
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E8689",
    alignItems: "stretch",
  },
  logo: {
    width: 55,
    height: 55,
    marginTop: 95,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {
    height: 100,
    color: "white",
    fontSize: 30,
    fontWeight: "400",
    marginHorizontal: 15,
    paddingTop: 20,
  },
  signInButton: {
    height: 45,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  moreOptionButton: {
    height: 30,
    justifyContent: "center",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    marginVertical: 20,
  },
  info: {
    flex: 2,
    marginHorizontal: 15,
    marginVertical: 20,
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
});

export default LoggedOutScreen;
