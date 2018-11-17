import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { onSignOut, getSessionKey } from "../../Global/Auth";
import { getUserInfo } from "../../services/LoginService";

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

const numColumns = 3;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { viewRef: null };
  }

  componentDidMount() {
    getSessionKey().then(res => {
      console.log("ASYNC STORAGE KEY : " + res);
      if (res !== null) {
        getUserInfo(res).then(userInfo => {
          console.log("USER INFO :" + userInfo.data.firstName);
        });
      }
    });
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

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
                        style={{ color: global.foregroundColor, fontSize: 11 }}
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
                  <Text
                    style={{ fontSize: 40, fontWeight: "100", paddingLeft: 30 }}
                  >
                    Hello
                  </Text>
                </Col>
                <Col size={2} />
              </Row>
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
                    style={{ fontSize: 42, fontWeight: "500", paddingLeft: 30 }}
                  >
                    John Doe
                  </Text>
                </Col>
                <Col size={2} />
              </Row>
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
                          paddingLeft: 30
                        }}
                      >
                        Product&nbsp;
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "100" }}>
                        Designer
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
                data={formatData(data, numColumns)}
                style={styles.flatList}
                renderItem={this.renderItem}
                numColumns={numColumns}
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
    flex: 1
  },
  profileHeader: {
    flex: 1,
    backgroundColor: global.backgroundColor
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
    margin: 2,
    borderRadius: 10,
    height: Dimensions.get("window").width / numColumns
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
