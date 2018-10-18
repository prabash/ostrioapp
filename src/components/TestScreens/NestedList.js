import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { ListItem } from "react-native-elements";

const BACON_IPSUM =
  "Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ";

const CONTENT = [
  {
    title: "First",
    items: [
      {
        subItem: "first_one"
      }
    ]
  },
  {
    title: "Second",
    items: [
      {
        subItem: "second_one"
      },
      {
        subItem: "second_two"
      }
    ]
  },
  {
    title: "Third",
    items: [
      {
        subItem: "third_one"
      },
      {
        subItem: "third_two"
      },
      {
        subItem: "third_three"
      }
    ]
  }
];

export default class NestedList extends Component {
  state = {
    activeSections: [],
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      
        <ListItem
        title={section.title}
        titleStyle={section.headerText}
        key={section.title}
        />
    );
  };

  renderContent(section, _, isActive) {
    return section.items.map(a => (
      <ListItem
        title={a.subItem}
        titleStyle={styles.lineItemTitle}
        key={a.subItem}
        subtitle={`From ${section.title}`}
        subtitleStyle={styles.lineItemSubtitle}
      />
    ));
  }

  render() {
    const { activeSections} = this.state;
    return (
      <View style={styles.container}>
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          onChange={this.setSections}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    justifyContent: "center"
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500"
  },
  lineItemTitle: {
    color: global.foregroundColor,
    textAlign: "left",
    fontSize: 16
  },
  lineItemSubtitle: {
    color: global.foregroundColor,
    textAlign: "left",
    fontSize: 12
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)"
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)"
  }
});
