import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import { Icon } from "native-base";

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Forgot your password?</Text>
          <Text style={styles.headerDetails}>
            Enter your email below to receive your password reset instructions
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" type="EvilIcons" style={styles.inputIcon}/>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity style={styles.FgtPasswordBtnContainer}>
          <Text style={styles.FgtPasswordBtnText}>RESET PASSWORD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(17, 17, 17, 1.0)",
    padding: 20
  },
  headerContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "200",
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: 'center'
  },
  headerDetails: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    width: 260,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 100,
    paddingLeft: 10,
    marginBottom: 10,
    height: 40
  },
  inputIcon: {
    paddingLeft: 5,
    color: "rgba(255, 255, 255, 0.4)"
  },
  input: {
    flex: 1,
    color: "#FFF",
    paddingLeft: 5
  },
  FgtPasswordBtnContainer: {
    backgroundColor: "rgba(241, 196, 15, 0.7)",
    height: 40,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 10
  },
  FgtPasswordBtnText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "200"
  }
});
