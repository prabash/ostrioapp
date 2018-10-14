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

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.inputContainer}>
          <Icon name="user" type="EvilIcons" style={styles.inputIcon}/>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" type="EvilIcons" style={styles.inputIcon}/>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            secureTextEntry
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
          />
        </View>
        <TouchableOpacity style={styles.signInBtnContainer}>
          <Text style={styles.signInBtnText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fgtPasswordContainer}>
          <Text style={styles.fgtPasswordText}>Forgot Password?</Text>
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
  signInBtnContainer: {
    backgroundColor: "rgba(241, 196, 15, 0.7)",
    height: 40,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 10
  },
  signInBtnText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "200"
  },
  fgtPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  fgtPasswordText:{
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "100"
  }
});
