import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Snackbar from "react-native-snackbar";
import firebase from "react-native-firebase";
import { GoogleSignin } from "react-native-google-signin";
import * as Animatable from "react-native-animatable";

import LoadingModal from "../components/LoadingModal";

export class LoggedOutScreen extends Component {
  state = {
    isLoading: false,
    isSigninFailed: false,
  };

  onSignin = async () => {
    if (this.state.isSigninFailed) {
      return;
    }

    try {
      // Add any configuration settings here:
      await GoogleSignin.configure({
        iosClientId: "610569492825-rghasvb9km7mfkbrehpj1iv7ibvajc9g.apps.googleusercontent.com",
      });

      const data = await GoogleSignin.signIn();

      this.setState({ isLoading: true });

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      if (!currentUser.user.email.split("@")[1]) {
        await firebase.auth().signOut();
        this.setState({ isSigninFailed: true });
        this.setState({ isLoading: false });
        setTimeout(() => {
          Snackbar.show({
            title: "抱歉，我不認得你是誰。",
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              title: "x",
              color: "white",
              onPress: () => this.setState({ isSigninFailed: false }),
            },
          });
        }, 200);

        return;
      }

      this.setState({ isLoading: false });
      this.props.navigation.navigate("App");
    } catch (e) {
      // Cancel by user
      if (e.code === -5) {
        return;
      }

      this.setState({ isLoading: false });
      console.error(e);
    }
  };

  onMoreOption = () => {};

  render() {
    const containerStyle = [styles.container];
    const signinButtonStyle = [styles.signinButton];

    if (this.state.isSigninFailed) {
      containerStyle.push({ backgroundColor: "#D43018" });
      signinButtonStyle.push({ backgroundColor: "#D43018" });
    }

    return (
      <SafeAreaView style={containerStyle}>
        <Animatable.Image
          animation="pulse"
          iterationCount="infinite"
          source={require("../../assets/logo-AM.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>歡迎使用Aeonstagram。</Text>
        <TouchableOpacity onPress={this.onSignin}>
          <View style={signinButtonStyle}>
            <FAIcon name="google" style={{ color: "white", fontSize: 22, zIndex: 1000 }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>使用Google帳號登入</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onMoreOption} style={styles.moreOptionButton}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}> 更多選項 </Text>
        </TouchableOpacity>
        <Text style={styles.info}>
          輕點繼續、建立帳號或「更多」選項，及代表我同意Aeonstagram的服務條款、付款服務條款、隱私政策與反歧視政策。
        </Text>

        <LoadingModal visible={this.state.isLoading} />
      </SafeAreaView>
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
    marginHorizontal: 15,
  },
  title: {
    height: 100,
    color: "white",
    fontSize: 25,
    fontWeight: "400",
    marginHorizontal: 15,
    paddingTop: 20,
  },
  signinButton: {
    flexDirection: "row",
    height: 45,
    marginHorizontal: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#1E8689",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    elevation: 3,
    borderRadius: 30,
    justifyContent: "flex-start",
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
