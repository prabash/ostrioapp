import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  AppState,
  StyleSheet,
  PropTypes,
  TouchableHighlight
} from "react-native";

export default class PushNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 5,
      test: 10,
      pressStatus: false
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = appState => {
    if (appState === "background") {
      console.log("app is in background : " + this.state.seconds);
    }
  };

  _onHideUnderlay = () => {
    this.setState({ pressStatus: false });
  };
  _onShowUnderlay = () => {
    this.setState({ pressStatus: true });
  };

  _togglePressStatus = () => {
    this.setState({ pressStatus: !this.state.pressStatus });
  };

  setSeconds(seconds) {
    this.setState({ seconds });
  }

  render() {
    return (
      // <View>
      //   <Text style={{ alignSelf: "center" }}>
      //     {" "}
      //     Choose your notification time in seconds:{" "}
      //   </Text>
      //   <Picker
      //     selectedValue={this.state.seconds}
      //     onValueChange={seconds => this.setSeconds(seconds)}
      //   >
      //     <Picker.Item label="5" value={5} />
      //     <Picker.Item label="10" value={10} />
      //     <Picker.Item label="15" value={15} />
      //     <Picker.Item label="20" value={20} />
      //   </Picker>
      <View style={styles.container}>
        <TouchableHighlight
          activeOpacity={1}
          style={this.state.pressStatus ? styles.buttonPress : styles.button}
          onPress={() => this._togglePressStatus()}
        >
          <Text
            style={
              this.state.pressStatus ? styles.welcomePress : styles.welcome
            }
          >
            Click Me!
          </Text>
        </TouchableHighlight>
      </View>
      // </View>
    );
  }
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
    margin: 10,
    color: "#000066"
  },
  welcomePress: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  },
  button: {
    borderColor: "#000066",
    borderWidth: 1,
    borderRadius: 10
  },
  buttonPress: {
    borderColor: "#000066",
    backgroundColor: "#000066",
    borderWidth: 1,
    borderRadius: 10
  }
});
