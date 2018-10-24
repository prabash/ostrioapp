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

const data = [
  {
    key: "Pending Approvals",
    icon: "clock-fast",
    color: "#eb4d4b",
    count: 20,
    badgeColor: global.accentColor
  },
  {
    key: "All Purchase Requisitions",
    icon: "playlist-check",
    color: "#6ab04c",
    count: 50,
    badgeColor: global.accentColor
  },
  {
    key: "Home",
    icon: "home-outline",
    color: "#ffbe76"
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

export default class PurchaseRequisitionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { viewRef: null };
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  menuItemOnPress = key => {
    console.log("+++++++++++++++++++++ " + key);
    if (key == "Home") {
      this.props.navigation.navigate("Home");
    }
    if (key == "Pending Approvals") {
      this.props.navigation.navigate("PendingApprovals");
    }
    if (key == "All Purchase Requisitions") {
      this.props.navigation.navigate("AllApprovals");
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
                  size={50}
                  color={global.themeColor}
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
                  alignItems: "flex-start",
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
          <Row size={0.4}>
            <Grid style={{ flex: 1 }}>
              <Row />
              <Row
                size={2}
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  alignContent: "flex-start"
                }}
              >
                <Text
                  style={{ fontSize: 30, fontWeight: "500", paddingLeft: 20 }}
                >
                  Purchase
                </Text>
                <Text style={{ fontSize: 30, fontWeight: "100" }}>
                  &nbsp;Requisitions
                </Text>
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
