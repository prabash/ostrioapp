import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon
} from "native-base";

const BACON_IPSUM =
  "Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ";

const CONTENT = [
  {
    title: "First Approval",
    content: BACON_IPSUM,
    status: "Approved"
  },
  {
    title: "Second Approval",
    content: BACON_IPSUM,
    status: "Approved"
  },
  {
    title: "Third Approval",
    content: BACON_IPSUM,
    status: "Rejected"
  },
  {
    title: "Fourth Approval",
    content: BACON_IPSUM,
    status: "Approved"
  },
  {
    title: "Fifth Approval",
    content: BACON_IPSUM,
    status: "Rejected"
  }
];

export default class AllApprovals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: "rgba(254, 164, 127,1.0)"
    };
  }

  static navigationOptions = {
    title: "All Approvals", // title showed on the navigator
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="list"
        type="SimpleLineIcons"
        style={{ fontSize: 24, color: tintColor }}
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View>
            <List
              dataArray={CONTENT}
              renderRow={item => (
                <ListItem>
                  <Body>
                    <Text style={styles.listItemText}>{item.title} </Text>
                    <Text note style={styles.listItemSubText}>{item.status}</Text>                    
                  </Body>
                  <Right>
                    <Icon name="eye" type="SimpleLineIcons"/>
                  </Right>
                </ListItem>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#404040"
  },
  header: {
    flexDirection: "row"
  },
  headerTitle: {
    color: "#FFFFFF"
  },
  logo: {
    width: 50,
    height: 50
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  listItemText: {
    fontSize: 14,
    color : "#FFFFFF"
  },
  listItemSubText: {
    fontSize: 12,
    color : "#B2BEC3"
  }
});
