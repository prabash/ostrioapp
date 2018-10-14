import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation";

import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import HomePage from "../HomePage/HomePage";
import PendingApprovals from "../PendingApprovals/PendingApprovals";
import AllApprovals from "../AllApprovals/AllApprovals";

export default class MainDrawerNavigator extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return <AppDrawerNavigator />;
  }
}

const DrawerLogoHeader = props => (
  <SafeAreaView>
    <View
      style={{ height: 150, alignItems: "center", justifyContent: "center" }}
    >
      <Image
        source={require("../../images/logo.png")}
        style={{ height: 120, width: 120 }}
      />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: HomePage,
    Pending: PendingApprovals,
    All: AllApprovals
  },
  {
    contentComponent: DrawerLogoHeader,
    contentOptions: {
      activeTintColor: "purple"
    }
  }
);
