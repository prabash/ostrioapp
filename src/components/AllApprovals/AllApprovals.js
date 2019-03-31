import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import {
  getPRInfoPaging,
  getAllPRInfo
} from "../../services/PurchaseRequisitionsService";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import {
  Button,
  Header,
  Left,
  Body,
  Right,
  Item,
  Input,
  Title
} from "native-base";
import Accordion from "react-native-collapsible/Accordion";
import { Col, Row, Grid } from "react-native-easy-grid";
import { global } from "core-js";
import { getSessionKeyDetails } from "../../services/LoginService";
import { getSessionKey } from "../../Global/Auth";

var skip = 0;
export default class PendingApprovals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
      checked: false,
      allFilterPressed: false,
      pendingFilterPressed: false,
      approvedFilterPressed: false,
      rejectedFilterPressed: false,
      content: [],
      filteredContent: [],
      loading: true,
      loadMoreBusy: false,
      showLoadMore: false,
      originalShowLoadMore: false,
      showSearchBar: false,
      username: ""
    };
  }

  componentDidMount() {
    getSessionKey().then(sessionKey => {
      console.log("ASYNC STORAGE KEY : " + sessionKey);
      if (sessionKey !== null) {
        console.log(getSessionKeyDetails(sessionKey));
        var keyDetails = getSessionKeyDetails(sessionKey);
        this.setState({ username: keyDetails.unique_name });

        this.loadAllApprovals();
      }
    });
  }

  toggleSearchBar = () => {
    this.searchAllApprovals("");
    this.setState({
      showSearchBar: !this.state.showSearchBar
    });
  };

  togglePressStatus = buttonType => {
    if (buttonType === "All") {
      this.searchByStatus("");
      this.setState(
        { allFilterPressed: !this.state.allFilterPressed },
        function() {
          if (this.state.allFilterPressed) {
            this.setState({
              pendingFilterPressed: false,
              approvedFilterPressed: false,
              rejectedFilterPressed: false
            });
          }
        }
      );
    }
    if (buttonType === "Pending") {
      this.setState(
        { pendingFilterPressed: !this.state.pendingFilterPressed },
        function() {
          if (this.state.pendingFilterPressed) {
            this.searchByStatus("P");
            this.setState({
              allFilterPressed: false,
              approvedFilterPressed: false,
              rejectedFilterPressed: false
            });
          } else {
            this.searchByStatus("");
          }
        }
      );
    }
    if (buttonType === "Approved") {
      this.setState(
        { approvedFilterPressed: !this.state.approvedFilterPressed },
        function() {
          if (this.state.approvedFilterPressed) {
            this.searchByStatus("A");
            this.setState({
              allFilterPressed: false,
              pendingFilterPressed: false,
              rejectedFilterPressed: false
            });
          } else {
            this.searchByStatus("");
          }
        }
      );
    }
    if (buttonType === "Rejected") {
      this.setState(
        { rejectedFilterPressed: !this.state.rejectedFilterPressed },
        function() {
          if (this.state.rejectedFilterPressed) {
            this.searchByStatus("X");
            this.setState({
              allFilterPressed: false,
              pendingFilterPressed: false,
              approvedFilterPressed: false
            });
          } else {
            this.searchByStatus("");
          }
        }
      );
    }
  };

  loadAllApprovals = () => {
    this.setState({ loadMoreBusy: true });
    console.log("+++++++++++++++++++ USERNAME" + this.state.username);
    getPRInfoPaging(skip, global.prTakeValue, this.state.username).then(res => {
      const jsonArray = JSON.parse(res.data);
      //const jsonArray = res.data;

      if (jsonArray.length == global.prTakeValue) {
        skip += global.prTakeValue;
        var showLoadMore = true;
      } else {
        var showLoadMore = false;
      }
      // originalShowLoadMore is used to keep the original status of the showLoadMore variable
      // since it will changed when searching
      this.setState({
        showLoadMore: showLoadMore,
        originalShowLoadMore: showLoadMore
      });

      var currentContent = this.state.content;
      var content = currentContent.concat(jsonArray);

      this.setState({
        content: content,
        filteredContent: content,
        loading: false,
        loadMoreBusy: false
      });
    });
  };

  onPressHeader = PRHeaderId => {
    this.props.navigation.navigate("PurchaseRequisitionHeader", { PRHeaderId });
  };

  onPressLine = (PRHeaderID, PRLineId, PRLineNo) => {
    this.props.navigation.navigate("PurchaseRequisitionLine", {
      PRHeaderID, PRLineId, PRLineNo
    });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    });
  };

  searchAllApprovals = value => {
    if (this.state.originalShowLoadMore) {
      value == ""
        ? this.setState({ showLoadMore: true })
        : this.setState({ showLoadMore: false });
    }

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

  searchByStatus = value => {
    if (this.state.originalShowLoadMore) {
      value == ""
        ? this.setState({ showLoadMore: true })
        : this.setState({ showLoadMore: false });
    }

    const filterData = this.state.content.filter(field =>
      field.Status != null
        ? field.Status.toLowerCase().indexOf(value.toLowerCase()) !== -1
        : true
    );
    // add the filteredContent to the respective state variable
    const filteredContent = filterData;
    this.setState({ filteredContent });
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
            onPress={() => this.onPressLine(section.ID, lineItem.ID, lineItem.PRLine)}
          />
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
      showSearchBar,
      checked
    } = this.state;
    // If the data is still loading, return the activity indicator view with heading
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Header
            searchBar
            rounded
            style={{ backgroundColor: global.themeColor }}
            androidStatusBarColor={global.themeColor}
          >
            <Left>
              <Button transparent>
                <Icon
                  name="chevron-left"
                  type="evilicon"
                  size={40}
                  onPress={() => this.props.navigation.goBack(null)}
                  color={global.headerForegroundColor}
                />
              </Button>
            </Left>
            <Body style={{ flex: 2 }}>
              <Title style={{ color: global.headerForegroundColor }}>
                All Purchase Requisitions
              </Title>
            </Body>
            <Right />
          </Header>
          <View style={styles.headerContainer}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "500",
                paddingLeft: 20,
                color: global.foregroundColor
              }}
            >
              All Purchase
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
    return (
      <View style={styles.container}>
        {!showSearchBar ? (
          <Header
            searchBar
            rounded
            style={{ backgroundColor: global.themeColor }}
            androidStatusBarColor={global.themeColor}
          >
            <Left>
              <Button transparent>
                <Icon
                  name="chevron-left"
                  type="evilicon"
                  size={40}
                  onPress={() => this.props.navigation.goBack(null)}
                  color={global.headerForegroundColor}
                />
              </Button>
            </Left>
            <Body style={{ flex: 2 }}>
              <Title style={{ color: global.headerForegroundColor }}>
                All Purchase Requisitions
              </Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon
                  name="search"
                  type="evilicon"
                  onPress={() => this.toggleSearchBar()}
                  color={global.headerForegroundColor}
                />
              </Button>
            </Right>
          </Header>
        ) : (
          <Header
            searchBar
            rounded
            style={{ backgroundColor: global.themeColor }}
            androidStatusBarColor={global.themeColor}
          >
            <Item>
              <Icon name="search" type="evilicon" />
              <Input
                placeholder="Search All PRs"
                onChangeText={text => this.searchAllApprovals(text)}
              />
              <Icon
                name="close"
                type="evilicon"
                onPress={() => this.toggleSearchBar()}
              />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
        )}
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "500",
              paddingLeft: 20,
              color: global.foregroundColor
            }}
          >
            All Purchase
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
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.filterButtonView}>
            <TouchableHighlight
              activeOpacity={1}
              onPress={() => this.togglePressStatus("All")}
              style={
                !this.state.allFilterPressed
                  ? [styles.filterButton, styles.allFilterButtonNotPressed]
                  : [styles.filterButton, styles.allFilterButtonPressed]
              }
            >
              <Text
                style={
                  !this.state.allFilterPressed
                    ? [
                        styles.filterButtonText,
                        { color: global.prAllFilterColor }
                      ]
                    : [
                        styles.filterButtonText,
                        { color: global.backgroundColor }
                      ]
                }
              >
                All
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.filterButtonView}>
            <TouchableHighlight
              onPress={() => this.togglePressStatus("Pending")}
              style={
                !this.state.pendingFilterPressed
                  ? [styles.filterButton, styles.pendingFilterButtonNotPressed]
                  : [styles.filterButton, styles.pendingFilterButtonPressed]
              }
            >
              <Text
                style={
                  !this.state.pendingFilterPressed
                    ? [
                        styles.filterButtonText,
                        { color: global.prPendingFilterColor }
                      ]
                    : [
                        styles.filterButtonText,
                        { color: global.backgroundColor }
                      ]
                }
              >
                Pending
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.filterButtonView}>
            <TouchableHighlight
              onPress={() => this.togglePressStatus("Approved")}
              style={
                !this.state.approvedFilterPressed
                  ? [styles.filterButton, styles.approvedFilterButtonNotPressed]
                  : [styles.filterButton, styles.approvedFilterButtonPressed]
              }
            >
              <Text
                style={
                  !this.state.approvedFilterPressed
                    ? [
                        styles.filterButtonText,
                        { color: global.prApprovedFilterColor }
                      ]
                    : [
                        styles.filterButtonText,
                        { color: global.backgroundColor }
                      ]
                }
              >
                Approved
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.filterButtonView}>
            <TouchableHighlight
              onPress={() => this.togglePressStatus("Rejected")}
              style={
                !this.state.rejectedFilterPressed
                  ? [styles.filterButton, styles.rejectedFilterButtonNotPressed]
                  : [styles.filterButton, styles.rejectedFilterButtonPressed]
              }
            >
              <Text
                style={
                  !this.state.rejectedFilterPressed
                    ? [
                        styles.filterButtonText,
                        { color: global.prRejectedFilterColor }
                      ]
                    : [
                        styles.filterButtonText,
                        { color: global.backgroundColor }
                      ]
                }
              >
                Rejected
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <Grid>
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
                      <TouchableOpacity onPress={() => this.loadAllApprovals()}>
                        <Text
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 10,
                            marginBottom: 10,
                            color: global.foregroundColor
                          }}
                        >
                          Load More...
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.flatten({
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
    backgroundColor: global.backgroundColor,
    borderWidth: 2
  },
  allFilterButtonNotPressed: {
    borderColor: global.prAllFilterColor
  },
  allFilterButtonPressed: {
    backgroundColor: global.prAllFilterColor,
    borderColor: global.prAllFilterColor
  },
  pendingFilterButtonNotPressed: {
    borderColor: global.prPendingFilterColor
  },
  pendingFilterButtonPressed: {
    backgroundColor: global.prPendingFilterColor,
    borderColor: global.prPendingFilterColor
  },
  approvedFilterButtonNotPressed: {
    borderColor: global.prApprovedFilterColor
  },
  approvedFilterButtonPressed: {
    backgroundColor: global.prApprovedFilterColor,
    borderColor: global.prApprovedFilterColor
  },
  rejectedFilterButtonNotPressed: {
    borderColor: global.prRejectedFilterColor
  },
  rejectedFilterButtonPressed: {
    backgroundColor: global.prRejectedFilterColor,
    borderColor: global.prRejectedFilterColor
  },
  filterButtonText: {
    padding: 5
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
