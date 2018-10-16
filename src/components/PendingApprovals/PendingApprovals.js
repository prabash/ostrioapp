import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import { Header, Button, Left, Body, Right, Icon } from "native-base";
import Accordion from "react-native-collapsible/Accordion";
import ActionButton from "react-native-action-button";

const BACON_IPSUM =
  "Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ";

const CONTENT = [
  {
    title: "First Approval",
    content: BACON_IPSUM
  },
  {
    title: "Second Approval",
    content: BACON_IPSUM
  },
  {
    title: "Third Approval",
    content: BACON_IPSUM
  },
  {
    title: "Fourth Approval",
    content: BACON_IPSUM
  },
  {
    title: "Fifth Approval",
    content: BACON_IPSUM
  }
];

export default class PendingApprovals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
      checked: false,
      themeColor: "rgba(254, 164, 127,1.0)"
    };
  }

  static navigationOptions = {
    title: "Pending Approvals", // title showed on the navigator
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="clock" type="SimpleLineIcons"
        style={{ fontSize: 24, color: tintColor }}
      />
    )
  };

  checkOnValueChange = value => {
    this.setState({ checked: value });
    console.log("Switch 1 is: " + value);
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.listHeader, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Left style={{ flex: 1 }}>
          <Icon
            name="arrow-down"
            type="EvilIcons"
            style={{ color: "#FFFFFF" }}
          />
        </Left>
        <Body
          style={{
            flex: 6,
            alignItems: "flex-start",
            justifyContent: "flex-start"
          }}
        >
          <Text style={styles.listHeaderText}>{section.title}</Text>
        </Body>
        <Right style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Switch
            value={this.state.checked}
            onValueChange={this.checkOnValueChange}
            trackColor="white"
          />
        </Right>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.listContent, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={styles.listContentText}
        >
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections, checked } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.accordianContainer}>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>

        <ActionButton
          buttonColor= {this.state.themeColor}
          style={{ marginBottom: 30 }}
          degrees={0}
          renderIcon={active =>
            active ? (
              <Icon
                name="checkbox-multiple-marked-outline"
                type="MaterialCommunityIcons"
                style={styles.actionButtonIcon}
              />
            ) : (
              <Icon
                name="checkbox-multiple-marked"
                type="MaterialCommunityIcons"
                style={styles.actionButtonIcon}
              />
            )
          }
        >
          >
        </ActionButton>

        <View style={styles.buttonContainer}>
          <View style={styles.approveRejectButtonsView}>
            <Button ful success style={styles.approveRejectButton}>
              <Text style={styles.approveRejectButtonText}>APPROVE</Text>
            </Button>
          </View>
          <View style={styles.approveRejectButtonsView}>
            <Button ful danger style={styles.approveRejectButton}>
              <Text style={styles.approveRejectButtonText}>REJECT</Text>
            </Button>
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
  accordianContainer: {
    flex: 1
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20
  },
  listHeader: {
    backgroundColor: "#404040",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  listHeaderText: {
    color: "#FFFFFF",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "200"
  },
  listContent: {
    padding: 20,
    backgroundColor: "#252525"
  },
  listContentText: {
    color: "#FFFFFF"
  },
  buttonContainer: {
    flexDirection: "row",
  },
  approveRejectButtonsView: {
    flex: 1,
    padding: 5
  },
  approveRejectButton: {
    alignSelf: "center",
    alignItems:"center",
    justifyContent: 'center',
    width: "100%"
  },
  approveRejectButtonText: {
    fontWeight: "bold",
  }
});
