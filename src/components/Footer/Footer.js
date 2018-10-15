import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.footNote}>&#169; OS TRIO 2018 | All Rights Reserved</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  footNote: {
    color: global.foregroundColor,
    fontSize: 10,
    fontWeight: "100",
    justifyContent: "center",
    alignContent: "center"
  }
});
