import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Header, Left, Icon, Body, Title, Right, Badge } from "native-base";
import { createStackNavigator } from 'react-navigation';


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: "rgba(254, 164, 127,1.0)"
    };
  }

  static navigationOptions = {
    title: "Home", // title showed on the navigator
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="home"
        type="SimpleLineIcons"
        style={{ fontSize: 24, color: tintColor }}
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          style={[styles.header, { backgroundColor: this.state.themeColor }]}
          androidStatusBarColor={this.state.themeColor}
        >
          <Left style={{ flex: 1, justifyContent: "flex-start" }}>
            <Icon
              ios="ios-menu"
              android="md-menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
          </Left>
          <Body
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              style={styles.logo}
              source={require("../../images/logo.png")}
            />
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>

        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar1.png"
              }}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.designation}>Product Designer</Text>
          </View>
        </View>

        <View style={styles.body}>
          <TouchableOpacity style={styles.optionContainer}>
            <Icon
              name="home"
              type="SimpleLineIcons"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer}>
            <Icon
              name="clock"
              type="SimpleLineIcons"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>PENDING APPROVALS</Text>
            <View style={styles.optionBadgeContainer}>
              <View>
                <Badge style={styles.optionBadgePending}>
                  <Text style={styles.optionBadgeText}>12</Text>
                </Badge>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer}>
            <Icon
              name="list"
              type="SimpleLineIcons"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>ALL APPROVALS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer}>
            <Icon
              name="check"
              type="SimpleLineIcons"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>APPROVED/REJECTED</Text>
            <View style={styles.optionBadgeContainer}>
              <View>
                <Badge style={styles.optionBadgeApproved}>
                  <Text style={styles.optionBadgeText}>22</Text>
                </Badge>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer}>
            <Icon
              name="logout"
              type="SimpleLineIcons"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row"
  },
  headerTitle: {
    color: "black"
  },
  logo: {
    width: 50,
    height: 50
  },
  profileHeader: {
    flex: 1,
    backgroundColor: "#101010",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
      width: 10
    },
    shadowRadius: 4,
    elevation: 2
  },
  profileHeaderContent: {
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: 10
  },
  image: {
    width: 60,
    height: 60
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "200",
    textAlign: "center"
  },
  designation: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center"
  },
  body: {
    flex: 1.7,
    padding: 30,
    backgroundColor: "#404040"
  },
  optionContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20
  },
  optionIcon: {
    color: "#FFFFFF"
  },
  optionText: {
    fontSize: 23,
    fontWeight: "100",
    color: "#FFFFFF",
    paddingLeft: 20
  },
  optionBadgeContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  optionBadgePending: {
    fontSize: 15,
    backgroundColor: "rgba(235, 77, 75, 1.0)",
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
    height: 20
  },
  optionBadgeApproved: {
    fontSize: 15,
    backgroundColor: "rgba(106, 176, 76,1.0)",
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
    height: 20
  },
  optionBadgeText: {
    color: "#FFF"
  }
});
