import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { onSignOut, getSessionKey } from "../../Global/Auth";
import { getUserInfo, getSessionKeyDetails } from "../../services/LoginService";
import AppPlatfrom from "../../Global/AppPlatform";

const data = [
  {
    key: "Purchase Requisition",
    icon: "shopping",
    count: 50,
    badgeColor: global.accentColor,
    color: "#ffbe76"
  },
  {
    key: "Purchase Order",
    icon: "fire-truck",
    color: "#eb4d4b"
  },
  {
    key: "Contracts",
    icon: "clipboard-check-outline",
    count: 20,
    badgeColor: global.accentColor,
    color: "#6ab04c"
  },
  {
    key: "Schedule Agreements",
    icon: "timetable",
    color: "#e056fd"
  },
  {
    key: "Test Item 1",
    icon: "cube-send",
    color: "#22a6b3"
  },
  {
    key: "Test Item 2",
    icon: "earth",
    color: "#f9ca24"
  },
  {
    key: "Logout",
    icon: "logout",
    color: "#ff7979"
  }
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
      username: "User",
      role: null,
      numColumns: AppPlatfrom.isPortrait() ? 3 : 5,
      orientation: AppPlatfrom.isPortrait() ? "portrait" : "landscape",
      devicetype: AppPlatfrom.isTablet() ? "tablet" : "phone"
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: AppPlatfrom.isPortrait() ? "portrait" : "landscape",
        numColumns: AppPlatfrom.isPortrait() ? 3 : 5
      });
    });
  }

  componentDidMount() {
    getSessionKey().then(sessionKey => {
      console.log("ASYNC STORAGE KEY : " + sessionKey);
      if (sessionKey !== null) {
        console.log(getSessionKeyDetails(sessionKey));
        var keyDetails = getSessionKeyDetails(sessionKey);
        console.log("KEY DETAILS : " + keyDetails);
        var permissionDetails = JSON.parse(keyDetails.permission);
        console.log("USERID : " + permissionDetails.userId);

        getUserInfo(sessionKey, permissionDetails.userId).then(userInfo => {
          this.setState({ role: this.capitalizeFirstLetter(keyDetails.role) });
          if (
            typeof userInfo.data.firstName != "undefined" &&
            userInfo.data.firstName !== null
          ) {
            console.log("FIRST NAME : " + userInfo.data.firstName);
            this.setState({
              username:
                this.capitalizeFirstLetter(userInfo.data.firstName) +
                this.capitalizeFirstLetter(userInfo.data.lastName)
            });
          } else {
            console.log("UNIQUE NAME : " + keyDetails.unique_name);
            this.setState({
              username: this.capitalizeFirstLetter(keyDetails.unique_name)
            });
          }
        });
      }
    });
  }

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  getNumColumns = () => {
    return this.state.numColumns;
  };

  menuItemOnPress = key => {
    console.log("+++++++++++++++++++++ " + key);
    if (key == "Logout") {
      onSignOut().then(() => this.props.navigation.navigate("SignedOut"));
    }
    if (key == "Purchase Requisition") {
      this.props.navigation.navigate("PurchaseRequisitionsMenu");
    }
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return (
        <View style={[styles.flatListItem, styles.flatListItemInvisible]} />
      );
    }
    return (
      <View style={styles.flatListItem}>
        <TouchableOpacity
          style={styles.flatListItem}
          onPress={() => this.menuItemOnPress(item.key)}
        >
          <Grid>
            <Row size={2.5}>
              <Col size={0.5} />
              <Col
                size={5}
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-end"
                }}
              >
                <Icon
                  name={item.icon}
                  type="material-community"
                  color={global.themeColor}
                  size={50}
                  style={{ fontSize: 50, color: global.themeColor }}
                />
              </Col>
              <Col size={2}>
                <Grid>
                  <Row />
                  <Row>
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: item.badgeColor,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text
                        style={{
                          color: global.accentOffsetColor,
                          fontSize: 11
                        }}
                      >
                        {" "}
                        {item.count}{" "}
                      </Text>
                    </View>
                  </Row>
                  <Row />
                  <Row />
                </Grid>
              </Col>
            </Row>
            <Row size={2}>
              <Col size={0.5} />
              <Col
                size={5}
                style={{
                  alignContent: "flex-start",
                  justifyContent: "flex-start"
                }}
              >
                <Text style={styles.flatListItemText}>{item.key}</Text>
              </Col>
              <Col size={1} />
            </Row>
          </Grid>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { username, role } = this.state;
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={1.2}>
            <Grid style={{ flex: 1 }}>
              <Row />
              <Row />
              <Row size={2}>
                <Col
                  size={2.5}
                  style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    alignContent: "flex-end"
                  }}
                >
                  {this.state.orientation == "landscape" ? (
                    <Text
                      style={{
                        fontSize: 34,
                        fontWeight: "500",
                        paddingLeft: 30,
                        color: global.foregroundColor
                      }}
                    >
                      Hello&nbsp;{username}!
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 36,
                        fontWeight: "100",
                        paddingLeft: 30,
                        color: global.foregroundColor
                      }}
                    >
                      Hello
                    </Text>
                  )}
                </Col>
                <Col size={2} />
              </Row>
              {this.state.orientation == "portrait" ? (
                <Row size={2}>
                  <Col
                    size={2.5}
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      alignContent: "flex-start"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 34,
                        fontWeight: "500",
                        paddingLeft: 30,
                        color: global.foregroundColor
                      }}
                    >
                      {username}!
                    </Text>
                  </Col>
                </Row>
              ) : null}

              <Row size={1.5}>
                <Col
                  size={2.5}
                  style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                  }}
                >
                  <Grid>
                    <Row>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "500",
                          paddingLeft: 30,
                          color: global.foregroundColor
                        }}
                      >
                        {role}
                      </Text>
                    </Row>
                  </Grid>
                </Col>
                <Col size={2} />
              </Row>
            </Grid>
          </Row>
          <Row size={3}>
            <View style={styles.menuItemContainer}>
              <FlatList
                key={
                  this.state.orientation == "portrait"
                    ? "portrait"
                    : "landscape"
                }
                extraData={this.state}
                data={formatData(data, this.state.numColumns)}
                style={styles.flatList}
                renderItem={this.renderItem}
                numColumns={this.state.numColumns}
              />
            </View>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.backgroundColor
  },
  profileHeader: {
    flex: 1,
    backgroundColor: global.backgroundColor
  },
  profileHeaderContent: {
    padding: 30,
    alignItems: "center",
    color: global.foregroundColor
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: global.foregroundColor,
    fontWeight: "200",
    textAlign: "center"
  },
  designation: {
    fontSize: 14,
    color: global.foregroundColor,
    textAlign: "center"
  },
  menuItemContainer: {
    flex: 1,
    padding: 10
  },
  flatList: {
    flex: 1
  },
  flatListItem: {
    backgroundColor: global.backgroundOffsetColor,
    flex: 1,
    margin: 3,
    borderRadius: 10,
    height: 135
  },
  flatListItemInvisible: {
    backgroundColor: "transparent"
  },
  flatListItemText: {
    color: global.foregroundColor,
    fontSize: 14,
    fontWeight: "bold"
  }
});
