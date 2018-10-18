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
import { Header, Button, Left, Body, Right, Icon } from "native-base";
import { ListItem } from "react-native-elements";
import Accordion from "react-native-collapsible/Accordion";
import ActionButton from "react-native-action-button";
import { Col, Row, Grid } from "react-native-easy-grid";

const CONTENT = [
  {
    PRNo: "OTT/150000",
    PRDate: "31/12/2018",
    Status: "Pending",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-001"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-001"
      }
    ]
  },
  {
    PRNo: "OTT-150001",
    PRDate: "14/12/2018",
    Status: "Pending",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-002"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-002"
      },
      {
        lineItemNo: 3,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-002"
      },
      {
        lineItemNo: 4,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-002"
      }
    ]
  },
  {
    PRNo: "OTT-150002",
    PRDate: "25/10/2018",
    Status: "Pending",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-003"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-003"
      },
      {
        lineItemNo: 3,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-003"
      }
    ]
  },
  {
    PRNo: "OTT-150003",
    PRDate: "31/11/2018",
    Status: "Pending",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-004"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-004"
      }
    ]
  },
  {
    PRNo: "OTT-150004",
    PRDate: "31/10/2018",
    Status: "Pending",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-005"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-005"
      }
    ]
  }
];

export default class PendingApprovals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
      checked: false
    };
  }

  static navigationOptions = {
    title: "Pending Approvals", // title showed on the navigator
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="clock"
        type="SimpleLineIcons"
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
      <ListItem
        title={`PR No: ${section.PRNo}`}
        titleStyle={styles.listHeaderText}
        subtitle={`PR Date: ${section.PRDate} \n Status: ${section.Status}`}
        subtitleStyle={styles.lineItemSubtitle}
        key={section.PRNo}
        badge={{ value: section.lines.length , textStyle: { color: global.foregroundColor }, containerStyle: { backgroundColor: global.accentColor }}}
        leftIcon= {<Icon name="shopping" type="MaterialCommunityIcons" style={{ color: global.foregroundColor }}/>}
        />
    );
  };

  renderContent(section, _, isActive) {
    return section.lines.map(lineItem => (
      <ListItem
        containerStyle ={{backgroundColor: global.backgroundOffsetColor }}
        title={lineItem.lineItemNo + " : " + lineItem.StockCode}
        titleStyle={styles.lineItemTitle}
        key={lineItem.lineItemNo}
        subtitle={`Vendor: ${lineItem.Vendor}`}
        subtitleStyle={styles.lineItemSubtitle}
        leftIcon= {<Icon name="cart-outline" type="MaterialCommunityIcons" style={{ color: global.foregroundColor, paddingLeft: 20 , fontWeight: "100"}}/>}
        switchButton
        hideChevron
      />
    ));
  }

  render() {
    const { multipleSelect, activeSections, checked } = this.state;
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
                  Pending
                </Text>
                <Text style={{ fontSize: 30, fontWeight: "100" }}>
                  &nbsp;Approvals
                </Text>
              </Row>
            </Grid>
          </Row>
          <Row size={3}>
            <View style={{flex: 1}}>
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
                buttonColor={global.backgroundOffsetColor}
                style={styles.actionButton}
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
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: global.backgroundColor
  },
  header: {
    flexDirection: "row"
  },
  headerTitle: {
    color: global.foregroundColor
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
    backgroundColor: global.backgroundColor,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  listHeaderText: {
    color: global.foregroundColor,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10
  },
  listContent: {
    padding: 20,
    backgroundColor: global.backgroundOffsetColor
  },
  listContentText: {
    color: global.foregroundColor
  },
  lineItemTitle: {
    color: global.foregroundColor,
    textAlign: "left",
    fontSize: 16,
    paddingLeft: 10
  },
  lineItemSubtitle: {
    color: global.foregroundColor,
    textAlign: "left",
    fontSize: 12,
    paddingLeft: 10
  },
  actionButton: {
    marginBottom: 30,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
      width: 10
    },
    shadowRadius: 4,
    elevation: 2
  },
  buttonContainer: {
    flexDirection: "row"
  },
  approveRejectButtonsView: {
    flex: 1,
    padding: 5
  },
  approveRejectButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 100
  },
  approveRejectButtonText: {
    fontWeight: "bold"
  }
});
