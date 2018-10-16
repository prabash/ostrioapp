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
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

const data = [
  {
    key: "Purchase Requisition",
    icon: "shopping",
    color: "#ffbe76"
  },
  {
    key: "Purchase Order",
    icon: "target",
    color: "#eb4d4b"
  },
  {
    key: "Contracts",
    icon: "clipboard-check-outline",
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
    key: "Test Item 3",
    icon: "fire-truck",
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

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return (
        <View style={[styles.flatListItem, styles.flatListItemInvisible]} />
      );
    }
    return (
      <View style={styles.flatListItem}>
        <TouchableOpacity style={styles.flatListItem}>
          <Grid>
            <Row size={2.5}>
              <Col size={0.5} />
              <Col
                size={5}
                style={{
                  alignContent: "flex-end",
                  justifyContent: "flex-end"
                }}
              >
                <Icon
                  name={item.icon}
                  type="MaterialCommunityIcons"
                  style={{ fontSize: 50, color: item.color }}
                />
              </Col>
              <Col size={1} />
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
          <Row size={1.3}>
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
    backgroundColor: global.backgroundColor,
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
    padding: 5
  },
  flatList: {
    flex: 1,
    marginVertical: 20
  },
  flatListItem: {
    backgroundColor: global.foregroundColor,
    flex: 1,
    margin: 2,
    height: Dimensions.get("window").width / numColumns
  },
  flatListItemInvisible: {
    backgroundColor: "transparent"
  },
  flatListItemText: {
    color: global.backgroundColor,
    fontSize: 14,
    fontWeight: "bold"
  }
});
