import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Splash from "./src/components/Splash/Splash"
import Login from "./src/components/Login/Login";
import ForgotPassword from "./src/components/ForgotPassword/ForgotPassword";
import HomePage from "./src/components/HomePage/HomePage";
import MainDrawerNavigator from "./src/components/MainDrawerNavigator/MainDrawerNavigator";
import CollapsiblePanel from "./src/components/CollapsiblePanel/CollapsiblePanel";
import PendingApprovals from "./src/components/PendingApprovals/PendingApprovals";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <MainDrawerNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
