import React, { Component } from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";

import Footer from "../Footer/Footer";
import LoginForm from "../LoginForm/LoginForm";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent/>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../images/logo.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(17, 17, 17, 1.0)"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    width: 100,
    height: 100
  },
  formContainer: {
    flexGrow: 2
  }
});
