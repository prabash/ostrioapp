import React, { Component } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import Footer from "../Footer/Footer";

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <StatusBar translucent />
        <View style={styles.mainTitle}>
          <Image
            source={require("../../images/logo.png")}
            style={{ height: 50, width: 200 }}
          />
        </View>
        <Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: global.backgroundColor,
    justifyContent: "center",
    alignItems: "center"
  },
  splashText: {
    color: "#e74c3c",
    fontWeight: "200",
    fontSize: 36
  },
  mainTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
