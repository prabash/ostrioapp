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
import Footer from "../Footer/Footer";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <View style={styles.forgotPasswordFormContainer}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Forgot your password?</Text>
            </View>

            <View style={styles.inputContainer}>
              <Icon name="envelope" type="EvilIcons" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={global.foregroundColor}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity style={styles.FgtPasswordBtnContainer}>
              <Text style={styles.FgtPasswordBtnText}>RESET PASSWORD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginContainer}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>Remembered?</Text>
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
  forgotPasswordFormContainer: {
    flex: 1,
    backgroundColor: global.backgroundColor,
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
    color: global.foregroundColor,
    textAlign: "center"
  },
  headerDetails: {
    fontSize: 12,
    color: global.foregroundColor,
    width: 260,
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: global.backgroundColor,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: global.accentColor,
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
    paddingLeft: 5
  },
  FgtPasswordBtnContainer: {
    backgroundColor: global.accentColor,
    height: 40,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 10
  },
  FgtPasswordBtnText: {
    textAlign: "center",
    color: global.foregroundColor,
    fontSize: 16,
    fontWeight: "200"
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  loginText: {
    color: global.foregroundColor,
    fontWeight: "100"
  }
});
