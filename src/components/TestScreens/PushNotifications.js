import React, { Component } from "react";
import { View, Text, Picker, AppState } from "react-native";

export default class PushNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 5,
      test: 10
    };
  }

  componentDidMount(){
      AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount(){
      AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (appState) => {
      if (appState === "background"){
          console.log("app is in background : " + this.state.seconds);
      }
  }

  setSeconds(seconds){
    this.setState({ seconds });
  }

  render() {
    return (
      <View>
        <Text style={{ alignSelf: "center" }}> Choose your notification time in seconds: </Text>
        <Picker
          selectedValue={this.state.seconds}
          onValueChange={(seconds) => this.setSeconds(seconds)}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
          <Picker.Item label="20" value={20} />
        </Picker>
      </View>
    );
  }
}
