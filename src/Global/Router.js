import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import Login from "../components/Login/Login";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import HomePage from "../components/HomePage/HomePage";

export const SignedOut = createStackNavigator(
  {
    Login: Login,
    ForgotPassword: ForgotPassword
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const SignedIn = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        tabBarLabel: "Home",
      }
    }
  },
  {
    headerMode: "screen"
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
