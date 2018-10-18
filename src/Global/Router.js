import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import Login from "../components/Login/Login";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import PurchaseRequisitionsPage from "../components/PurchaseRequisitionsPage/PurchaseRequisitionsPage";
import Splash from "../components/Splash/Splash";
import PendingApprovals from "../components/PendingApprovals/PendingApprovals";
import AllApprovals from "../components/AllApprovals/AllApprovals";
import HomePage from "../components/HomePage/HomePage";

export const SignedOut = createStackNavigator(
  {
    Splash: Splash,
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
    Home : {
      screen: HomePage,
      navigationOptions: {
        tabBarLabel: "Home",
      }
    },
    PurchaseRequisitions: {
      screen: PurchaseRequisitionsPage,
      navigationOptions: {
        tabBarLabel: "Purchase Requisitons",
      }
    },
    PendingApprovals : {
      screen : PendingApprovals,
      navigationOptions: {
        tabBarLabel: "Pending Approvals",
      }
    },
    AllApprovals : {
      screen : AllApprovals,
      navigationOptions: {
        tabBarLabel: "All Approvals",
      }
    },
  },
  {
    headerMode: "none"
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
