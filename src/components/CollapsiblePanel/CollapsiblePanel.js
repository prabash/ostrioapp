import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import { CheckBox, Button, Left, Body, Right, Icon } from "native-base";
import Accordion from "react-native-collapsible/Accordion";

const BACON_IPSUM =
  "Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ";

const CONTENT = [
  {
    title: "First",
    content: BACON_IPSUM
  },
  {
    title: "Second",
    content: BACON_IPSUM
  },
  {
    title: "Third",
    content: BACON_IPSUM
  },
  {
    title: "Fourth",
    content: BACON_IPSUM
  },
  {
    title: "Fifth",
    content: BACON_IPSUM
  }
];

const SELECTORS = [
  {
    title: "First",
    value: 0
  },
  {
    title: "Third",
    value: 2
  },
  {
    title: "None"
  }
];

export default class CollapsiblePanel extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
    checked: false
  };

  checkOnValueChange = (value) => {
    this.setState({ checked: value });
    console.log('Switch 1 is: ' + value)
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
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Left>
          <Icon name="arrow-down" type="EvilIcons"/>
        </Left>
        <Body>
          <Text style={styles.headerText}>{section.title}</Text>
        </Body>
        <Right>
          <Switch value={this.state.checked} onValueChange= {this.checkOnValueChange}/>
        </Right>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections, checked } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Text style={styles.title}>Accordion Example</Text>

          <View style={styles.multipleToggle}>
            <Text style={styles.multipleToggle__title}>Multiple Select?</Text>
            <Switch
              value={multipleSelect}
              onValueChange={multipleSelect =>
                this.setState({ multipleSelect })
              }
            />
          </View>

          <View style={styles.selectors}>
            <Text style={styles.selectTitle}>Select:</Text>

            {SELECTORS.map(selector => (
              <TouchableOpacity
                key={selector.title}
                onPress={() => this.setSections([selector.value])}
              >
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }
                  >
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={this.toggleExpanded}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerText}>Single Collapsible</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <CheckBox onPress={this.checkButton} />
              </View>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.content}>
              <Text>
                Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                ribs
              </Text>
            </View>
          </Collapsible>
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
        <Switch value={checked} onValueChange= {this.checkOnValueChange}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500"
  },
  content: {
    padding: 20,
    backgroundColor: "#fff"
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)"
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)"
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  activeSelector: {
    fontWeight: "bold"
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center"
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8
  }
});
