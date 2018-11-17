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
import { Icon } from "react-native-elements";
import { onSignIn } from "../../Global/Auth";
import { login } from "../../services/LoginService"

import Footer from "../Footer/Footer";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    login("ostrio", "admin@123");
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../images/logo.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.loginFormContainer}>
            <StatusBar barStyle="light-content" />
            <View style={styles.inputContainer}>
              <Icon name="user" type="evilicon" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={global.foregroundColor}
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" type="evilicon" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={global.foregroundColor}
                secureTextEntry
                returnKeyType="go"
                ref={input => (this.passwordInput = input)}
              />
            </View>
            <TouchableOpacity
              style={styles.signInBtnContainer}
              onPress={() => {
                onSignIn().then(() =>
                  this.props.navigation.navigate("SignedIn")
                );
              }}
            >
              <Text style={styles.signInBtnText}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fgtPasswordContainer}
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.fgtPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.backgroundColor
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    width: 160,
    height: 40
  },
  formContainer: {
    flexGrow: 2
  },
  loginFormContainer: {
    flex: 1,
    backgroundColor: global.backgroundColor,
    padding: 20
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: global.accentColor,
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 10,
    marginBottom: 10,
    height: 40
  },
  inputIcon: {
    paddingLeft: 5,
    color: global.foregroundColor
  },
  input: {
    flex: 1,
    color: global.foregroundColor,
    paddingLeft: 5
  },
  signInBtnContainer: {
    backgroundColor: global.accentColor,
    height: 40,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 10
  },
  signInBtnText: {
    textAlign: "center",
    color: global.foregroundColor,
    fontSize: 16,
    fontWeight: "200"
  },
  fgtPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  fgtPasswordText: {
    color: global.foregroundColor,
    fontWeight: "100"
  }
});
