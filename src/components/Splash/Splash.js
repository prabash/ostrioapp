import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Footer from "../Footer/Footer";

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <StatusBar translucent/>
        <View style={styles.mainTitle}>
          <Text style={styles.splashText}>OS TRIO&#8482;</Text>
        </View>
        <Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#171717",
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
