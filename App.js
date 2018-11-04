import React, { Component } from "react";
import { Platform, StyleSheet, ToastAndroid } from "react-native";
import { isSignedIn } from "./src/Global/Auth";

import "./src/Global/Global";
import { createRootNavigator } from "./src/Global/Router";
import HomePage from "./src/components/HomePage/HomePage";
import PurchaseRequisitionHeader from "./src/components/PurchaseRequisitionHeader/PurchaseRequisitionHeader";
import PurchaseRequisitionLine from "./src/components/PurchaseRequisitionLine/PurchaseRequisitionLine";
import PushNotifications from "./src/components/TestScreens/PushNotifications";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

var PushNotification = require("react-native-push-notification");

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);

    setTimeout(() => {
      if(!notification['foreground']){
        ToastAndroid.show("You've clicked!", ToastAndroid.SHORT);
      }
    }, 1);

    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: notification['name'], // (required)
      date: new Date(Date.now() + (60 * 1000)) // in 60 secs
    });

  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "783426617393",
  popInitialNotification: true,
  requestPermissions: true
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    //If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }
    
    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }

  // render() {
  //   return (
  //     <PushNotifications/>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
