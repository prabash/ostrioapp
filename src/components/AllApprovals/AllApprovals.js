import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import { Button } from "native-base";
import Accordion from "react-native-collapsible/Accordion";
import { Col, Row, Grid } from "react-native-easy-grid";
import { global } from "core-js";

const CONTENT = [
  {
    PRNo: "OTT/150005",
    PRDate: "31/12/2018",
    Status: "Completed",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-001",
        LineStatus: "Approved"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-001",
        LineStatus: "Approved"
      }
    ]
  },
  {
    PRNo: "OTT-150006",
    PRDate: "14/12/2018",
    Status: "Completed",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-002",
        LineStatus: "Approved"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-002",
        LineStatus: "Rejected"
      },
      {
        lineItemNo: 3,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-002",
        LineStatus: "Rejected"
      },
      {
        lineItemNo: 4,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-002",
        LineStatus: "Approved"
      }
    ]
  },
  {
    PRNo: "OTT-150007",
    PRDate: "25/10/2018",
    Status: "Completed",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-003",
        LineStatus: "Approved"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-003",
        LineStatus: "Approved"
      },
      {
        lineItemNo: 3,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-003",
        LineStatus: "Approved"
      }
    ]
  },
  {
    PRNo: "OTT-150008",
    PRDate: "31/11/2018",
    Status: "Completed",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-004",
        LineStatus: "Rejected"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-004",
        LineStatus: "Approved"
      }
    ]
  },
  {
    PRNo: "OTT-150009",
    PRDate: "31/10/2018",
    Status: "Completed",
    lines: [
      {
        lineItemNo: 1,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-005",
        LineStatus: "Approved"
      },
      {
        lineItemNo: 2,
        StockCode: "UPKEEP-COMP",
        StockDesc: "Upkeep company",
        Vendor: "V-005",
        LineStatus: "Approved"
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
        type="simple-line-icon"
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
        badge={{
          value: section.lines.length,
          textStyle: { color: global.foregroundColor },
          containerStyle: { backgroundColor: global.accentColor }
        }}
        leftIcon={
          <Icon name="cart" type="evilicon" color={global.foregroundColor} />
        }
      />
    );
  };

  renderContent = (section, _, isActive) => {
    return section.lines.map(lineItem => (
      <ListItem
        containerStyle={{ backgroundColor: global.backgroundOffsetColor }}
        title={lineItem.lineItemNo + " : " + lineItem.StockCode}
        titleStyle={styles.lineItemTitle}
        key={lineItem.lineItemNo}
        subtitle={`Vendor: ${lineItem.Vendor}`}
        subtitleStyle={styles.lineItemSubtitle}
        badge={{
          value: lineItem.LineStatus,
          textStyle: { color: global.backgroundColor },
          containerStyle:
            lineItem.LineStatus == "Approved"
              ? { backgroundColor: "#6ab04c" }
              : { backgroundColor: "#eb4d4b" },
          wrapperStyle: { paddingRight: 10 }
        }}
        leftIcon={
          <Icon
            name="archive"
            type="evilicon"
            color={global.foregroundColor}
            style={{
              paddingLeft: 20
            }}
          />
        }
        hideChevron
      />
    ));
  };

  render() {
    const { multipleSelect, activeSections, checked } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 30, fontWeight: "500", paddingLeft: 20 }}>
            All Purchase
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "100" }}>
            &nbsp;Requisitions
          </Text>
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar
            lightTheme
            icon={{ type: "evilicons", name: "search" }}
            placeholder="Search PRs..."
            containerStyle={{ backgroundColor: global.backgroundOffsetColor }}
            inputStyle={{ backgroundColor: global.backgroundColor }}
            round
            clearIcon
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.filterButtonView}>
            <Button
              rounded
              style={[
                styles.filterButton,
                { borderColor: "#3867d6", borderWidth: 2 }
              ]}
            >
              <Text style={{ color: "#3867d6" }}>All</Text>
            </Button>
          </View>
          <View style={styles.filterButtonView}>
            <Button
              rounded
              danger
              style={[
                styles.filterButton,
                { borderColor: "#f1c40f", borderWidth: 2 }
              ]}
            >
              <Text style={{ color: "#f1c40f" }}>Pending</Text>
            </Button>
          </View>
          <View style={styles.filterButtonView}>
            <Button
              rounded
              success
              style={[
                styles.filterButton,
                { borderColor: "#20bf6b", borderWidth: 2 }
              ]}
            >
              <Text style={{ color: "#20bf6b" }}>Approved</Text>
            </Button>
          </View>
          <View style={styles.filterButtonView}>
            <Button
              rounded
              danger
              style={[
                styles.filterButton,
                { borderColor: "#fc5c65", borderWidth: 2 }
              ]}
            >
              <Text style={{ color: "#fc5c65" }}>Rejected</Text>
            </Button>
          </View>
        </View>
        <Grid>
          <Row size={3}>
            <View style={{ flex: 1 }}>
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
  headerContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start"
  },
  searchBarContainer: {
    marginBottom: 10,
    backgroundColor: "blue"
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
  filterButtonView: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  filterButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderRadius: 50,
    backgroundColor: global.backgroundColor
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
