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
import Toast, { DURATION } from "react-native-easy-toast";
import { onSignIn } from "../../Global/Auth";
import { login } from "../../services/LoginService";

import Footer from "../Footer/Footer";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  getUsername = _username => {
    this.setState({ username: _username });
  };
  getPassword = _password => {
    this.setState({ password: _password });
  };

  loginUser = () => {
    login(this.state.username, this.state.password).then(res => {
      console.log(res.data);
      if (res.data.status) {
        console.log("SESSION_KEY: " + res.data.data);
        onSignIn(res.data.data).then(() =>
          this.props.navigation.navigate("SignedIn")
        );
      } else {
        this.refs.toastWithStyle.show(
          "Oops..Please check your username/password\nand try again!",
          2000
        );
      }
    });
  };

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
              <Icon
                name="user"
                type="evilicon"
                style={styles.inputIcon}
                color={global.foregroundColor}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={global.foregroundColor}
                returnKeyType="next"
                onChangeText={value => this.getUsername(value)}
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="lock"
                type="evilicon"
                style={styles.inputIcon}
                color={global.foregroundColor}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={value => this.getPassword(value)}
                placeholderTextColor={global.foregroundColor}
                secureTextEntry
                returnKeyType="go"
                ref={input => (this.passwordInput = input)}
              />
            </View>
            <TouchableOpacity
              style={styles.signInBtnContainer}
              onPress={() => {
                this.loginUser();
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
        <Toast
          ref="toastWithStyle"
          style={{ backgroundColor: global.prRejectedFilterColor }}
          position="bottom"
          positionValue={360}
          fadeInDuration={750}
          fadeOutDuration={1000}
        />

        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: global.backgroundColor
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 0.75,
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
    paddingLeft: 5
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
    color: global.accentOffsetColor,
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
