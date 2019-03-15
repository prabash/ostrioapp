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
import AppPlatfrom from "../../Global/AppPlatform";
import {
  getAllPRCount,
  getPendingPRCount
} from "../../services/PurchaseRequisitionsService";

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

export default class PurchaseRequisitionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
      numColumns: AppPlatfrom.isPortrait() ? 3 : 5,
      orientation: AppPlatfrom.isPortrait() ? "portrait" : "landscape",
      devicetype: AppPlatfrom.isTablet() ? "tablet" : "phone",
      menuData: [
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
      ]
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
    var pendingApprovalsCount = 0;
    var allApprovalsCount = 0;

    // getAllPRCount().then(res => {
    //   var count = res.data;
    //   console.log("+++++++" + count);
    //   allApprovalsCount = count;
    // });

    // getPendingPRCount().then(res => {
    //   var count = res.data;
    //   console.log("+++++++" + count);
    //   pendingApprovalsCount = count;
    // });

    var currentMenuData = this.state.menuData;
    for (var i = 0; i < currentMenuData.length; i++) {
      var obj = currentMenuData[i];
      if (obj.key === "Pending Approvals") {
        obj.count = pendingApprovalsCount;
      }
      if (obj.key === "All Purchase Requisitions"){
        obj.count = allApprovalsCount;
      }
    }

    this.setState(
      {
        menuData: currentMenuData,
        // THIS IS JUST A HACK TO CHANGE THE KEY SO THAT THE FLATLIST WILL RELOAD
        // THIS HAS BEEN RECTIFIED IN THE CALL BACK BY PUTTING IT BACK
        orientation: AppPlatfrom.isPortrait() ? "landscape" : "portrait"
      },
      () => {
        this.setState(
          {
            orientation: AppPlatfrom.isPortrait() ? "portrait" : "landscape"
          },
          () => {
            console.log(this.state.orientation);
          }
        );
      }
    );
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
    const { menuData, numColumns, orientation } = this.state;
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
                  style={{
                    fontSize: 30,
                    fontWeight: "500",
                    paddingLeft: 20,
                    color: global.foregroundColor
                  }}
                >
                  Purchase
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "100",
                    color: global.foregroundColor
                  }}
                >
                  &nbsp;Requisitions
                </Text>
              </Row>
              <Row />
            </Grid>
          </Row>
          <Row size={3}>
            <View style={styles.menuItemContainer}>
              <FlatList
                key={orientation == "portrait" ? "portrait" : "landscape"}
                data={formatData(menuData, numColumns)}
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
    flex: 1,
    backgroundColor: global.backgroundColor
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
