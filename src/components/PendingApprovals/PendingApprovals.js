import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Button, Header, Left, Body, Right, Item, Input } from "native-base";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import Accordion from "react-native-collapsible/Accordion";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  getAllPRInfo,
  getPRInfoPaging
} from "../../services/GetPurchaseRequisitions";
import axios from "axios";

function getJsonData() {
  return fetch(
    "https://gist.githubusercontent.com/mamodom/90a441ac8dababa7b68015a9b506fee5/raw/69e247f03b5732b359b7e258ecae47f8e078131a/foo.json"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return {
        lista: json.lista
      };
    })
    .catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      throw error;
    });
}

var skip = 0;
export default class PendingApprovals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
      checked: false,
      content: [],
      filteredContent: [],
      loading: true,
      loadMoreBusy: false,
      showLoadMore: false
    };
  }

  componentDidMount() {
    this.loadPendingApprovals();
  }

  loadPendingApprovals = () => {
    this.setState({ loadMoreBusy: true });
    getPRInfoPaging(skip, global.prTakeValue).then(res => {
      const jsonArray = JSON.parse(res.data);

      if (jsonArray.length == global.prTakeValue) {
        skip += global.prTakeValue;
        var showLoadMore = true;
      } else {
        var showLoadMore = false;
      }
      console.log("+++++++++++ skip " + skip);
      this.setState({ showLoadMore });

      console.log(jsonArray);
      for (var i = 0; i < jsonArray.length; i++) {
        var obj = jsonArray[i];
        obj.PRHeaderChecked = false;
        for (var j = 0; j < obj.PRDetailMasters.length; j++) {
          var line = obj.PRDetailMasters[j];
          line.PRLineChecked = false;
        }
      }

      var currentContent = this.state.content;
      var content = currentContent.concat(jsonArray);

      this.setState({
        content: content,
        filteredContent: content,
        loading: false,
        loadMoreBusy: false
      });
    });
    console.log("+++ DATA LOADED!");
  };

  testMethod(text) {
    alert(text);
  }

  checkOnPRHeaderValueChange = (value, PRNumber) => {
    console.log("Value: " + value);
    console.log("PRNo: " + PRNumber);

    const content = this.state.content;
    for (var i = 0; i < content.length; i++) {
      var obj = content[i];
      if (obj.PRNumber === PRNumber) {
        obj.PRHeaderChecked = value;
        for (var j = 0; j < obj.PRDetailMasters.length; j++) {
          var line = obj.PRDetailMasters[j];
          line.PRLineChecked = value;
        }
      }
    }

    const filteredContent = this.state.filteredContent;
    for (var i = 0; i < filteredContent.length; i++) {
      var obj = filteredContent[i];
      if (obj.PRNumber === PRNumber) {
        obj.PRHeaderChecked = value;
        for (var j = 0; j < obj.PRDetailMasters.length; j++) {
          var line = obj.PRDetailMasters[j];
          line.PRLineChecked = value;
        }
      }
    }

    this.setState({
      content: content,
      filteredContent: filteredContent
    });
  };

  checkOnPRLineValueChange = (value, PRNumber, PRLine) => {
    console.log("Value: " + value);
    console.log("PRNumber: " + PRNumber);
    console.log("PRLine: " + PRLine);

    const content = this.state.content;
    for (var i = 0; i < content.length; i++) {
      var obj = content[i];
      if (obj.PRNumber === PRNumber) {
        for (var j = 0; j < obj.PRDetailMasters.length; j++) {
          var line = obj.PRDetailMasters[j];
          if (line.PRLine == PRLine) {
            line.PRLineChecked = value;
          }
        }
      }
    }

    const filteredContent = this.state.filteredContent;
    for (var i = 0; i < filteredContent.length; i++) {
      var obj = filteredContent[i];
      if (obj.PRNumber === PRNumber) {
        for (var j = 0; j < obj.PRDetailMasters.length; j++) {
          var line = obj.PRDetailMasters[j];
          if (line.PRLine == PRLine) {
            line.PRLineChecked = value;
          }
        }
      }
    }

    this.setState({
      content: content,
      filteredContent: filteredContent
    });
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  onPressHeader = PRHeaderId => {
    this.props.navigation.navigate("PurchaseRequisitionHeader", { PRHeaderId });
  };
  onPressLine = PRLineId => {
    this.props.navigation.navigate("PurchaseRequisitionLine", {
      PRLineId
    });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    });
  };

  searchPendingApprovals = value => {
    value == ""
      ? this.setState({ showLoadMore: true })
      : this.setState({ showLoadMore: false });

    // get content (where all the data is) and filter it
    //const filterData = this.state.content.filter(field => (field.PRNo.toLowerCase().startsWith(value.toLowerCase()) || field.PRDate.toLowerCase().startsWith(value.toLowerCase())));
    const filterData = this.state.content.filter(
      field =>
        field.PRNumber.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        field.PR_Date.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    // add the filteredContent to the respective state variable
    const filteredContent = filterData;
    this.setState({ filteredContent });
  };

  static navigationOptions = {
    headerTitle: (
      <SearchBar
        lightTheme
        icon={{ type: "evilicons", name: "search" }}
        placeholder="Search PRs..."
        containerStyle={{ backgroundColor: global.backgroundOffsetColor }}
        inputStyle={{ backgroundColor: global.backgroundColor }}
        onChangeText={text => this.searchPendingApprovals(text)}
        round
        clearIcon
      />
    )
  };

  renderHeader = (section, _, isActive) => {
    return (
      <ListItem
        title={`PR No: ${section.PRNumber}`}
        titleStyle={styles.listHeaderText}
        subtitle={`PR Date: ${section.PR_Date} \n Status: ${section.Status}`}
        subtitleStyle={styles.lineItemSubtitle}
        key={section.PRNumber}
        badge={{
          value: section.PRDetailMasters.length,
          textStyle: { color: global.foregroundColor },
          containerStyle: { backgroundColor: global.accentColor }
        }}
        leftIcon={
          <Icon
            name="cart"
            type="evilicon"
            color={global.foregroundColor}
            onPress={() => this.onPressHeader(section.ID)}
          />
        }
        switchButton
        switched={section.PRHeaderChecked}
        onSwitch={value =>
          this.checkOnPRHeaderValueChange(value, section.PRNumber)
        }
        hideChevron
      />
    );
  };

  renderContent = (section, _, isActive) => {
    return section.PRDetailMasters.map(lineItem => (
      <ListItem
        containerStyle={{ backgroundColor: global.backgroundOffsetColor }}
        title={lineItem.PRLine + " : " + lineItem.StockDesc}
        titleStyle={styles.lineItemTitle}
        key={lineItem.PRLine}
        subtitle={`Vendor: ${lineItem.VendorID}`}
        subtitleStyle={styles.lineItemSubtitle}
        leftIcon={
          <Icon
            name="archive"
            type="evilicon"
            color={global.foregroundColor}
            onPress={() => this.onPressLine(lineItem.ID)}
          />
        }
        switchButton
        switched={lineItem.PRLineChecked}
        onSwitch={value =>
          this.checkOnPRLineValueChange(
            value,
            section.PRNumber,
            lineItem.PRLine
          )
        }
        hideChevron
      />
    ));
  };

  render() {
    const {
      multipleSelect,
      activeSections,
      filteredContent,
      checked
    } = this.state;
    // If the data is still loading, return the activity indicator view with heading
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 30, fontWeight: "500", paddingLeft: 20 }}>
              Pending
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "100" }}>
              &nbsp;Approvals
            </Text>
          </View>
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              animating={this.state.loading}
              hidesWhenStopped={true}
              color={global.accentColor}
              size="large"
              style={styles.activityIndicator}
            />
          </View>
        </View>
      );
    }
    // else rreturn the loaded view
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 30, fontWeight: "500", paddingLeft: 20 }}>
            Pending
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "100" }}>
            &nbsp;Approvals
          </Text>
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar
            lightTheme
            icon={{ type: "evilicons", name: "search" }}
            placeholder="Search PRs..."
            containerStyle={{ backgroundColor: global.backgroundOffsetColor }}
            inputStyle={{ backgroundColor: global.backgroundColor }}
            onChangeText={text => this.searchPendingApprovals(text)}
            round
            clearIcon
          />
        </View>
        <Grid style={styles.bodyContainer}>
          <Row size={3}>
            <View style={{ flex: 1 }}>
              <ScrollView style={styles.accordianContainer}>
                <Accordion
                  activeSections={activeSections}
                  sections={filteredContent}
                  expandMultiple={multipleSelect}
                  renderHeader={this.renderHeader}
                  renderContent={this.renderContent}
                  duration={400}
                  onChange={this.setSections}
                />
                {this.state.showLoadMore ? (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {this.state.loadMoreBusy ? (
                      <ActivityIndicator
                        animating={this.state.loadMoreBusy}
                        hidesWhenStopped={true}
                        color={global.accentColor}
                        size="large"
                        style={styles.activityIndicator}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.loadPendingApprovals()}
                      >
                        <Text
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 10,
                            marginBottom: 10
                          }}
                        >
                          Load More...
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}
              </ScrollView>
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
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center"
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
  bodyContainer: {
    flex: 1
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
